"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
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
  } catch (err: unknown) {
    return handleActionError(
      err,
      "Une erreur est survenue lors de la création de la variante"
    );
  }
  revalidatePath(paths.adminProduct(productId));
}
