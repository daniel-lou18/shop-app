"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";

export async function editVariants(formData: FormData) {
  const data = {
    productId: formData.get("productId") as string,
    currentColor: formData.get("currentColor") as string,
    variantColor: formData.get("variantColor") as string,
    variantPrice: formData.get("variantPrice") as string,
  };
  try {
    const result = await db.productVariant.updateMany({
      where: { productId: data.productId, color: data.currentColor },
      data: {
        color: data.variantColor,
        price: parseInt(data.variantPrice),
      },
    });
    console.log(result);
  } catch (err) {
    return { errors: { _form: ["Échec lors de la mise à jour des variants"] } };
  }
  revalidatePath(paths.adminProduct(data.productId));
}
