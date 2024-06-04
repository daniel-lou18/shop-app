import { handleFetchError } from "@/lib/errors";
import { db } from "..";
import { FetchResult } from "./products";
import { OrderWithItems } from "./orders";
import { revalidatePath } from "next/cache";
import { paths } from "@/lib/paths";

export async function fetchOrder(
  id: string | undefined
): Promise<FetchResult<OrderWithItems>> {
  try {
    if (!id) throw new Error("Id de la commande manquant");
    const result = await db.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            variant: { include: { product: { include: { brand: true } } } },
          },
        },
      },
    });
    if (!result)
      throw new Error(
        "Nous n'avons pas trouvé de commande correspondant à cet ID."
      );
    revalidatePath(paths.customerOrders(result.id));
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération de la commande"
    );
  }
}
