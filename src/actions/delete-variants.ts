"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";

export async function deleteVariants(formData: FormData) {
  const data = {
    variantIds: formData.get("variantIds") as string,
    productId: formData.get("productId") as string,
  };
  console.log(data);
  if (!data.variantIds) return { errors: { _form: ["Id(s) manquant(s)"] } };
  try {
    const result = await db.productVariant.deleteMany({
      where: { id: { in: data.variantIds.split(",") } },
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
  revalidatePath(paths.adminProduct(data.productId));
}
