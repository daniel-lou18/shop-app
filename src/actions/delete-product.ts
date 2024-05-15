"use server";

import { db } from "@/db";
import { paths } from "@/lib/paths";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  try {
    const res = await db.product.delete({ where: { id } });
    revalidatePath(paths.adminProducts());
  } catch (err: unknown) {
    return { error: "Échec lors de la suppression du produit" };
  }
}
