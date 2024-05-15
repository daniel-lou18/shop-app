"use server";

import { db } from "@/db";
import { paths } from "@/lib/paths";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function uploadImages(
  ids: string[] | false,
  productId: string | undefined,
  formData: FormData
) {
  if (!ids) return { errors: { _form: ["Id(s) manquant(s)"] } };
  try {
    const image: File | null = formData.get("image") as unknown as File;
    if (!image) throw new Error("Image manquante !");
    console.log(image);
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer);
    await db.productVariant.updateMany({
      where: { id: { in: ids } },
      data: {
        imagePath: `/${image.name}`,
      },
    });
    productId && revalidatePath(paths.adminProduct(productId));
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return { errors: { _form: ["Échec lors de l'ajout du fichier"] } };
    }
  }
}
