"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";
import { z } from "zod";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

const addVariantsSchema = z.object({
  productId: z.string().min(5),
  size: z.enum(sizes),
  color: z.string().min(1).max(50),
  price: z.coerce.number().int().min(0),
  stockQuantity: z.coerce.number().int().min(1).max(100000),
  sku: z.string().min(1).max(100),
});

type AddVariantSchemaType = {
  errors?: {
    productId?: string[];
    size?: string[];
    color?: string[];
    price?: string[];
    stockQuantity?: string[];
    sku?: string[];
    _form?: string[];
  };
};

export async function addVariants(
  productId: string | undefined,
  formState: AddVariantSchemaType,
  formData: FormData
): Promise<AddVariantSchemaType> {
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
  return redirect(paths.adminProduct(productId, "create-variant=success"));
}
