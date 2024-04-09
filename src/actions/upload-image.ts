"use server";
import { writeFile } from "fs/promises";
import path from "path";

export async function uploadImage(formData: FormData) {
  const image: File | null = formData.get("image") as unknown as File;
  if (!image) throw new Error("Image manquante !");
  console.log(image);
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public", image.name);
  await writeFile(filePath, buffer);
  return { message: "Le fichier a été ajouté" };
}
