import { handleFetchError } from "@/lib/errors";
import { db } from "..";
import { FetchResult } from "./products";
import {
  Brand,
  Order,
  OrderItem,
  Product,
  ProductVariant,
  User,
} from "@prisma/client";

export type ExtendedOrderItem = OrderItem & {
  variant: ProductVariant & { product: Product & { brand: Brand } };
};
export type OrderWithItems = Order & {
  orderItems: ExtendedOrderItem[];
};
export type OrdersWithItems = OrderWithItems[];

export type ExtendedOrderItemWithUser = ExtendedOrderItem & { user: User };
export type OrderWithItemsAndUser = OrderWithItems & { user: User };
export type OrdersWithItemsAndUser = OrderWithItemsAndUser[];

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

export async function fetchAllOrders(): Promise<
  FetchResult<OrdersWithItemsAndUser>
> {
  try {
    const result = await db.order.findMany({
      include: {
        orderItems: {
          include: {
            variant: { include: { product: { include: { brand: true } } } },
          },
        },
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
    if (!result || result.length === 0)
      throw new Error("Nous n'avons retrouvé aucune commande");
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupréation de toutes les commandes"
    );
  }
}
