"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";

const sizes = ["XS", "S", "M", "L", "XL"];

export async function addVariants(formData: FormData) {
  const data = {
    productId: formData.get("productId") as string,
    variantColor: formData.get("variantColor") as string,
    variantPrice: formData.get("variantPrice") as string,
  };
  try {
    for (const size of sizes) {
      const result = await db.productVariant.create({
        data: {
          product: { connect: { id: data.productId } },
          size,
          color: "Nouvelle couleur",
          price: 10000,
          stockQuantity: 100,
          sku: `XXX-${size}-${Date.now().toString()}`,
        },
      });
      console.log(result);
    }
  } catch (err) {
    console.error(err);
    return { errors: { _form: ["Échec lors de la création des variantes"] } };
  }
  revalidatePath(paths.adminProduct(data.productId));
}
