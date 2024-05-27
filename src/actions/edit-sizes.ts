"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
import { paths } from "@/lib/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editSizesSchema = z.array(
  z.object({
    id: z.string().min(1),
    stockQuantity: z.coerce.number().min(0),
    sku: z.string().min(1).max(100),
    size: z.string().min(1).max(10),
  })
);

export type EditSizesSchemaType = {
  success?: boolean;
  errors?: {
    id?: string[];
    stockQuantity?: string[];
    sku?: string[];
    size?: string[];
    _form?: string[];
  };
};

export async function editSizes(
  formState: EditSizesSchemaType,
  formData: FormData
): Promise<EditSizesSchemaType> {
  const sizesArray = Array.from(formData.entries()).reduce(
    (acc, [key, value]) => {
      const [field, id] = key.split("-");
      const existingItem = acc.find((item) => item.id === id);

      if (existingItem) {
        (existingItem as { [key: string]: string })[field] = value as string;
      } else {
        acc.push({ id, [field]: value });
      }
      return acc;
    },
    [] as { id?: string; stockQuantity?: string; sku?: string; size?: string }[]
  );

  const result = editSizesSchema.safeParse(sizesArray);

  if (!result.success) {
    console.log(result.error);
    return {
      // Encore à corriger ! Le schéma est un array, donc les erreurs sont ...
      success: false,
      errors: {
        _form: [
          "Erreur lors de la modification des tailles. Vérifiez les valeurs saisies.",
        ],
      },
    };
  }

  for (const size of result.data) {
    try {
      await db.productVariant.update({
        where: { id: size.id },
        data: {
          sku: size.sku,
          stockQuantity: size.stockQuantity,
          size: size.size,
        },
      });
    } catch (err: unknown) {
      return handleActionError(
        err,
        "Une erreur est survenue lors de la modification des tailles"
      );
    }
  }
  revalidatePath(paths.adminProduct(result.data[0].id));
  return { success: true };
}
