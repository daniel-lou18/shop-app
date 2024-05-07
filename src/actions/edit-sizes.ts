"use server";

import { db } from "@/db";
import { paths } from "@/helpers/helpers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editSizesSchema = z.array(
  z.object({
    id: z.string(),
    stockQuantity: z.coerce.number().int().min(0),
    sku: z.string(),
    size: z.string(),
  })
);

export type EditSizesSchemaType = {
  errors: {
    id?: string[];
    stockQuantity?: string[];
    sku?: string[];
    size?: string[];
    _form?: string[];
  };
};

export async function editSizes(formData: FormData) {
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
    return { errors: result.error.flatten().fieldErrors };
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
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        return { errors: { _form: [err.message] } };
      } else {
        return {
          errors: { _form: ["Échec lors de la modification des tailles"] },
        };
      }
    }
  }
  revalidatePath(paths.adminProduct(result.data[0].id));
}
