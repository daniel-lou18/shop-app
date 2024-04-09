"use server";

import { db } from "@/db";

export async function getProduct(id: string) {
  try {
    const product = await db.product.findFirst({
      where: { id },
      include: { brand: true, category: true },
    });
    return product;
  } catch (err) {
    return { error: "Échec lors de la récupération du produit" };
  }
}
