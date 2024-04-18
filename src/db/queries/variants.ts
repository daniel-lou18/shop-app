import { db } from "@/db";
import { ProductVariant } from "@prisma/client";

type ProductVariants = ProductVariant[];

export type ProductVariantByColor = {
  color: string;
  imagePath: string | null;
  price: number;
  totalStock: number;
  variants: ProductVariants;
  createdAt: Date;
};

export type ProductVariantsByColor = ProductVariantByColor[];

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
        createdAt: variant.createdAt,
      });
    }
    return acc;
  }, [] as ProductVariantsByColor);

  return variantsByColor;
}

export function getVariantsByColor(variants: ProductVariants) {
  return variants
    .reduce((acc, variant) => {
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
          createdAt: variant.createdAt,
        });
      }
      return acc;
    }, [] as ProductVariantsByColor)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
