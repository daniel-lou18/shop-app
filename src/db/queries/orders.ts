import { handleFetchError } from "@/lib/errors";
import { db } from "..";
import { FetchResult } from "./products";
import {
  Brand,
  Order,
  OrderItem,
  Product,
  ProductVariant,
} from "@prisma/client";

export type ExtendedOrderItem = OrderItem & {
  variant: ProductVariant & { product: Product & { brand: Brand } };
};

export type OrderWithItems = Order & {
  orderItems: ExtendedOrderItem[];
};

export type OrdersWithItems = OrderWithItems[];

export async function fetchOrdersbyUserId(
  userId: string | undefined
): Promise<FetchResult<OrdersWithItems>> {
  try {
    if (!userId) throw new Error("Id utilisateur manquant");
    const result = await db.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            variant: { include: { product: { include: { brand: true } } } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!result)
      throw new Error(
        "Une erreur est survenue lors de la récupération des commandes"
      );
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des commandes"
    );
  }
}
