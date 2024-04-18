"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
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
          price: parseInt(data.variantPrice),
          sku: `${data.variantColor}-${
            resultFind?.size
          }-${Date.now().toString()}`,
        },
      });
    }
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return {
        errors: { _form: ["Échec lors de la mise à jour des variantes"] },
      };
    }
  }
  if (data.productId) revalidatePath(paths.adminProduct(data.productId));
}
