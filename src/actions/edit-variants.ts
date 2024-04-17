"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";

export async function editVariants(formData: FormData) {
  const variantIds = formData.get("variantIds") as string;

  const data = {
    variantIdsArray: variantIds.split(","),
    variantColor: formData.get("variantColor") as string,
    variantPrice: formData.get("variantPrice") as string,
    productId: formData.get("productId") as string,
  };
  console.log(data.variantIdsArray);
  try {
    for (const id of data.variantIdsArray) {
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
      console.log(resultUpdate);
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
  revalidatePath(paths.adminProduct(data.productId));
}
