"use server";

import { db } from "@/db";
import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const addProductSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[A-Za-z0-9'\s-]{2,100}$/, {
      message:
        "must be between 2 and 100 characters long, contain only letters, numbers, spaces, hyphens and apostrophes, have at least one letter or number",
    }),
  description: z.string().min(10).max(1000),
  price: z.coerce.number().int().min(1).max(100000),
  brand: z.string(),
  category: z.string().min(1),
  sex: z.enum(["homme", "femme"]),
  status: z.string(),
});

export type AddProductSchemaType = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    brand?: string[];
    category?: string[];
    sex?: string[];
    status?: string[];
    _form?: string[];
  };
};

export async function addProduct(
  formData: FormData
): Promise<AddProductSchemaType> {
  const result = addProductSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    brand: formData.get("brand") as string,
    category: formData.get("category") as string,
    sex: formData.get("sex") as string,
    status: formData.get("status") as string,
  });

  if (!result.success) {
    console.log(result.error);
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: { _form: ["Vous devez être connecté pour créer un produit"] },
    };
  }

  try {
    const product = await db.product.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        price: result.data.price * 100,
        sex: result.data.sex,
        isActive: result.data.status === "active",
        imagePath: formData.get("imagePath") as string,
        brand: { connect: { id: result.data.brand } },
        category: { connect: { id: result.data.category } },
      },
    });
    for (const size of sizes) {
      await db.productVariant.create({
        data: {
          productId: product.id,
          size,
          price: product.price * 100,
          stockQuantity: 100,
          color: "base",
          sku: `base-${size}-${Date.now().toString()}`,
          imagePath: formData.get("imagePath") as string,
        },
      });
    }
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return { errors: { _form: ["Échec lors de la création du produit"] } };
    }
  }

  revalidatePath("/");
  return redirect(paths.adminProducts());
}
