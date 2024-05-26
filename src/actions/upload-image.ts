"use server";

import { handleActionError } from "@/lib/errors";
import { writeFile } from "fs/promises";
import path from "path";

type UploadImageSchemaType = {
  errors?: { _form?: string[] };
};

type ImagePath = string | undefined;

export async function uploadImage(
  formData: FormData
): Promise<UploadImageSchemaType | ImagePath> {
  let imagePath: string | undefined;

  try {
    const image: File | null = formData.get("image") as unknown as File;
    if (!image) throw new Error("Image manquante !");
    console.log(image);
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer);
    imagePath = `/${image.name}`;
  } catch (err: unknown) {
    handleActionError(
      err,
      "Une erreur est survenue lors de l'ajout du fichier"
    );
  }
  return imagePath;
}
