"use server";

import { db } from "@/db";

export async function getAllVariants({ id }: { id: string }) {
  try {
    const variants = await db.productVariant.findMany({
      where: { productId: id },
    });
    return variants;
  } catch (err: unknown) {
    return { error: "Échec lors de la récupération des variants" };
  }
}
