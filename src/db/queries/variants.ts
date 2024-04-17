import { db } from "@/db";
import { ProductVariant } from "@prisma/client";

type ProductVariants = ProductVariant[];

export type ProductVariantsByColor = {
  color: string;
  imagePath: string | null;
  price: number;
  totalStock: number;
  variants: ProductVariants;
}[];

export async function fetchProductVariants(
  productId: string
): Promise<ProductVariants> {
  return await db.productVariant.findMany({ where: { productId } });
}

export async function fetchProductVariantsByColor(
  productId: string
): Promise<ProductVariantsByColor> {
  const variants = await db.productVariant.findMany({
    where: { productId },
  });
  const variantsByColor = variants.reduce((acc, variant) => {
    const idx = acc.findIndex((item) => item.color === variant.color);
    if (idx !== -1) {
      acc[idx].totalStock += variant.stockQuantity;
      acc[idx].variants.push({ ...variant });
    } else {
      acc.push({
        variants: [{ ...variant }],
        color: variant.color,
        imagePath: variant.imagePath,
        price: variant.price,
        totalStock: variant.stockQuantity,
      });
    }
    return acc;
  }, [] as ProductVariantsByColor);

  return variantsByColor;
}
