"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
import { paths } from "@/lib/paths";
import { revalidatePath } from "next/cache";

type DeleteVariantsSchemaType = {
  success?: boolean;
  errors?: {
    _form?: string[];
  };
};

export async function deleteVariants(
  productId: string | undefined,
  variantIds: string[],
  formState: DeleteVariantsSchemaType
): Promise<DeleteVariantsSchemaType> {
  if (!productId || !variantIds || variantIds.length === 0) {
    return { success: false, errors: { _form: ["Id(s) manquant(s)"] } };
  }

  try {
    const result = await db.productVariant.deleteMany({
      where: { id: { in: variantIds } },
    });
    console.log(result);
  } catch (err: unknown) {
    return handleActionError(
      err,
      "Une erreur est survenue lors de la suppression de la variante"
    );
  }
  revalidatePath(paths.adminProduct(productId));
  return { success: true };
}
