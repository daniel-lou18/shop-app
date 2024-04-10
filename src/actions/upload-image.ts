"use server";
import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function uploadImage(
  id: string | undefined,
  currentImagePath: string | undefined,
  formData: FormData
) {
  try {
    const image: File | null = formData.get("image") as unknown as File;
    if (!image) throw new Error("Image manquante !");
    console.log(image);
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer);
    await db.product.update({
      where: { id },
      data: {
        imagePath: currentImagePath
          ? `${currentImagePath} /${image.name}`
          : `/${image.name}`,
      },
    });
    id && revalidatePath(paths.adminProduct(id));
    return { message: "Le fichier a été ajouté" };
  } catch (err) {
    return { error: "Échec lors de l'ajout du fichier" };
  }
}
