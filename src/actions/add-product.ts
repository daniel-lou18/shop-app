"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { redirect } from "next/navigation";
import { z } from "zod";

const sizes = ["XS", "S", "M", "L", "XL"];
const addProductSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[A-Za-z0-9'\s-]{2,50}$/, {
      message:
        "Must be between 2 and 50 characters long, contain only letters, numbers, spaces, hyphens and apostrophes, have at least one letter or number",
    }),
  description: z.string().min(10).max(1000),
  price: z.coerce.number().int().min(1).max(100000),
  brand: z.string().min(1),
  category: z.string().min(1),
});

export type AddProductSchemaType = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    brand?: string[];
    category?: string[];
  };
};

export async function addProduct(
  formData: FormData
): Promise<AddProductSchemaType> {
  await new Promise((res) => setTimeout(res, 1500));
  const result = addProductSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    imagePath: formData.get("imagePath") as string,
    brand: formData.get("brand") as string,
    category: formData.get("category") as string,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  return { errors: {} };
  // try {
  //   const product = await db.product.create({
  //     data: {
  //       ...data,
  //       brand: { connect: { id: data.brand } },
  //       category: { connect: { id: data.category } },
  //     },
  //   });
  //   sizes.forEach(async (size) => {
  //     await db.productVariant.create({
  //       data: {
  //         productId: product.id,
  //         size,
  //         stockQuantity: 100,
  //         color: "base",
  //         sku: `${size}-${Date.now().toString()}`,
  //       },
  //     });
  //   });
  // } catch (err: unknown) {
  //   console.error(err);
  //   return { error: "Échec lors de la création du produit" };
  // }
  // redirect(paths.adminProducts());
}
