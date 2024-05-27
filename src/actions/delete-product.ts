"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";

type DeleteProductSchemaType = { errors?: { _form?: string[] } };

export async function deleteProduct(
  id: string,
  formState: DeleteProductSchemaType,
  formData: FormData
): Promise<DeleteProductSchemaType> {
  try {
    const res = await db.product.delete({ where: { id } });
  } catch (err: unknown) {
    return handleActionError(
      err,
      "Une erreur est survenue lors de la suppression du produit"
    );
  }
  redirect(paths.adminProducts("delete=success"));
}
