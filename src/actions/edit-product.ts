"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { redirect } from "next/navigation";

export async function editProduct(id: string, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    imagePath: formData.get("imagePath") as string,
    brand: formData.get("brand") as string,
    category: formData.get("category") as string,
  };

  try {
    const res = await db.product.update({
      where: { id },
      data: {
        ...data,
        price: parseInt(data.price),
        brand: { connect: { id: data.brand } },
        category: { connect: { id: data.category } },
      },
    });
  } catch (err: unknown) {
    return { error: "Échec lors de la modification du produit" };
  }
  redirect(paths.adminProducts());
}
