import { handleFetchError } from "@/lib/errors";
import { db } from "..";
import { FetchResult } from "./products";
import { Order, OrderItem, ProductVariant, User } from "@prisma/client";

export type Users = User[];
export type OrderWithOderItemsAndVariants = Order & {
  orderItems: (OrderItem & { variant: ProductVariant })[];
};
export type UserWithOrders = User & {
  orders: OrderWithOderItemsAndVariants[];
};
export type UsersWithOrders = UserWithOrders[];

export async function fetchUsers(): Promise<FetchResult<Users>> {
  try {
    const result = await db.user.findMany({ orderBy: { name: "asc" } });
    if (!result || result.length === 0)
      throw new Error("Nous n'avons pas trouvé de clients");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(err);
  }
}

export async function fetchUsersWithOrders(): Promise<
  FetchResult<UsersWithOrders>
> {
  try {
    const result = await db.user.findMany({
      orderBy: { name: "asc" },
      include: {
        orders: { include: { orderItems: { include: { variant: true } } } },
      },
    });
    if (!result || result.length === 0)
      throw new Error("Nous n'avons pas trouvé de clients");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(err);
  }
}
