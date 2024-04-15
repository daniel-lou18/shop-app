import { db } from "@/db";

export async function editVariants(
  productId: string,
  currentColor: string,
  formData: FormData
) {
  const data = {
    variantColor: formData.get("variantColor") as string,
    variantPrice: formData.get("variantPrice") as string,
  };
  try {
    const result = await db.productVariant.updateMany({
      where: { productId, color: currentColor },
      data: {
        color: data.variantColor,
        price: parseInt(data.variantPrice),
      },
    });
    return result;
  } catch (err) {
    return { error: "Échec lors de la mise à jour des variants" };
  }
}
