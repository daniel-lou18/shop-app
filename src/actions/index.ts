"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  redirect("/admin/products");
}

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

  await db.product.create({
    data: {
      ...data,
      price: parseInt(data.price),
      brand: { connect: { id: data.brand } },
      category: { connect: { id: data.category } },
    },
  });
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  try {
    const res = await db.product.delete({ where: { id } });
    console.log(res);
    revalidatePath("/admin/products");
  } catch (err: unknown) {
    return { error: "Échec lors de la suppression du produit" };
  }
}
