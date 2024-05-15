"use server";

import { db } from "@/db";
import { paths } from "@/lib/paths";
import { revalidatePath } from "next/cache";

export async function deleteVariants(
  productId: string | undefined,
  variantIds: string[]
) {
  if (!productId || !variantIds || variantIds.length === 0)
    return { errors: { _form: ["Id(s) manquant(s)"] } };

  try {
    const result = await db.productVariant.deleteMany({
      where: { id: { in: variantIds } },
    });
    console.log(result);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return {
        errors: { _form: ["Échec lors de la suppression des variantes"] },
      };
    }
  }
  revalidatePath(paths.adminProduct(productId));
}
