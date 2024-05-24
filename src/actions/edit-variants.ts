"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
import { paths } from "@/lib/paths";
import { revalidatePath } from "next/cache";

export async function editVariants(
  productId: string | undefined,
  variantIds: string[],
  formData: FormData
) {
  const data = {
    variantIds,
    productId,
    variantColor: formData.get("variantColor") as string,
    variantPrice: formData.get("variantPrice") as string,
  };
  try {
    for (const id of data.variantIds) {
      const resultFind = await db.productVariant.findFirst({
        where: { id },
      });
      const resultUpdate = await db.productVariant.update({
        where: { id },
        data: {
          color: data.variantColor,
          price: parseInt(data.variantPrice) * 100,
          sku: `${data.variantColor}-${
            resultFind?.size
          }-${Date.now().toString()}`,
        },
      });
    }
  } catch (err: unknown) {
    return handleActionError(
      err,
      "Une erreur est survenue lors de la modification des variantes"
    );
  }
  if (data.productId) revalidatePath(paths.adminProduct(data.productId));
}
