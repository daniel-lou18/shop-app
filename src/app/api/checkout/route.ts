import { type CartOrder } from "@/app/(shop)/cart/_components/CartSummary";
import { db } from "@/db";
import { paths } from "@/lib/paths";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type RequestData = CartOrder;

export async function POST(request: Request) {
  const { orderData, userId } = (await request.json()) as RequestData;
  const orderIds = orderData.map((item) => item.variantId);

  try {
    if (!orderData?.length || !userId) {
      throw new Error("Commande invalide");
    }
    const variants = await db.productVariant.findMany({
      where: { id: { in: orderIds } },
      include: {
        product: true,
      },
    });
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    variants.forEach((variant) => {
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: variant.product.name,
          },
          unit_amount: variant.price,
        },
        quantity: orderData.find((item) => item.variantId === variant.id)
          ?.quantity,
      });
    });

    const newOrder = await db.order.create({
      data: {
        isPaid: false,
        userId: userId,
        orderItems: {
          create: orderData.map((item) => ({
            quantity: item.quantity,
            variant: { connect: { id: item.variantId } },
          })),
        },
      },
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.STORE_URL}?payment=success`,
      cancel_url: `${process.env.STORE_URL}?payment=cancel`,
      metadata: {
        orderId: newOrder.id,
      },
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    let errorMessage;
    if (err instanceof Error) errorMessage = err.message;
    else errorMessage = "Une erreur est survenue";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
