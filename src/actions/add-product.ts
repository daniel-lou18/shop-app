"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  await new Promise((res) => setTimeout(res, 1500));
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    imagePath: formData.get("imagePath") as string,
    brand: formData.get("brand") as string,
    category: formData.get("category") as string,
  };
  try {
    await db.product.create({
      data: {
        ...data,
        price: parseInt(data.price),
        brand: { connect: { id: data.brand } },
        category: { connect: { id: data.category } },
      },
    });
  } catch (err: unknown) {
    console.error(err);
    return { error: "Échec lors de la création du produit" };
  }
  redirect(paths.adminProducts());
}
