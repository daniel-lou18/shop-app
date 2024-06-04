import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    console.error(err);
    let errorMessage;
    if (err instanceof Error) errorMessage = err.message;
    else errorMessage = "Une erreur est survenue lors de l'envoi du webhook";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const id = session.metadata?.orderId;
  if (!id) throw new Error("Id commande manquant");

  if (event.type === "checkout.session.completed") {
    const order = await db.order.update({
      where: { id },
      data: {
        isPaid: true,
      },
      include: { orderItems: true },
    });

    for (const item of order.orderItems) {
      await db.productVariant.update({
        where: { id: item.variantId },
        data: { stockQuantity: { decrement: item.quantity } },
      });
    }
    return NextResponse.json({ order }, { status: 200 });
  }
}
