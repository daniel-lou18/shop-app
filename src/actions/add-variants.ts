"use server";

import { db } from "@/db";
import { paths } from "@/lib/paths";
import { revalidatePath } from "next/cache";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export async function addVariants(productId: string | undefined) {
  if (!productId) return { errors: { _form: ["Id manquant"] } };

  try {
    for (const size of sizes) {
      const result = await db.productVariant.create({
        data: {
          product: { connect: { id: productId } },
          size,
          color: "Nouvelle couleur",
          price: 10000,
          stockQuantity: 100,
          sku: `XXX-${size}-${Date.now().toString()}`,
        },
      });
    }
  } catch (err) {
    console.error(err);
    return { errors: { _form: ["Échec lors de la création des variantes"] } };
  }
  revalidatePath(paths.adminProduct(productId));
}
