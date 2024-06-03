import { handleFetchError } from "@/lib/errors";
import { db } from "..";
import { FetchResult } from "./products";
import { Order } from "@prisma/client";

export async function fetchOrdersbyUserId(
  userId: string | undefined
): Promise<FetchResult<Order[]>> {
  try {
    if (!userId) throw new Error("Id utilisateur manquant");
    const result = await db.order.findMany({ where: { userId } });
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
