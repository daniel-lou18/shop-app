"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";
import { z } from "zod";

const editVariantsSchema = z.object({
  productId: z.string().min(5),
  variantIds: z.array(z.string()),
  variantColor: z.string().min(1).max(50),
  variantPrice: z.coerce.number().min(0),
});

type EditVariantsSchemaType = {
  errors?: {
    productId?: string[];
    variantIds?: string[];
    variantColor?: string[];
    variantPrice?: string[];
    _form?: string[];
  };
};

export async function editVariants(
  productId: string | undefined,
  variantIds: string[],
  formState: EditVariantsSchemaType,
  formData: FormData
): Promise<EditVariantsSchemaType> {
  if (!productId) return { errors: { _form: ["Id manquant"] } };
  if (!variantIds || variantIds.length === 0)
    return { errors: { _form: ["Id(s) manquant(s)"] } };

  const data = {
    variantIds,
    productId,
    variantColor: formData.get("variantColor") as string,
    variantPrice: formData.get("variantPrice") as string,
  };

  const result = editVariantsSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    for (const id of result.data.variantIds) {
      const resultFind = await db.productVariant.findFirst({
        where: { id },
      });
      const resultUpdate = await db.productVariant.update({
        where: { id },
        data: {
          color: result.data.variantColor,
          price: result.data.variantPrice * 100,
          sku: `${result.data.variantColor}-${
            resultFind?.size
          }-${Date.now().toString()}`,
        },
      });
    }
  } catch (err: unknown) {
    return handleActionError(
      err,
      "Une erreur est survenue lors de la modification des variantes"
    );
  }
  redirect(paths.adminProduct(result.data.productId, "edit-variant=success"));
}
