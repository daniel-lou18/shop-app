import { db } from "@/db";
import { Product, ProductVariant } from "@prisma/client";
import { FetchResult } from "./products";
import { handleFetchError } from "@/lib/errors";

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
export type VariantWithProduct = ProductVariant & { product: Product };

export async function fetchProductVariants(
  productId: string
): Promise<ProductVariants> {
  return await db.productVariant.findMany({ where: { productId } });
}

export async function fetchProductVariantsByColor(
  productId: string
): Promise<FetchResult<ProductVariantsByColor>> {
  try {
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

    return { success: true, data: variantsByColor };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des variantes"
    );
  }
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

export async function fetchVariantWithProduct(
  variantId: string
): Promise<VariantWithProduct | null> {
  const variant = await db.productVariant.findFirst({
    where: { id: variantId },
  });
  if (!variant) return null;
  const product = await db.product.findFirst({
    where: { id: variant.productId },
  });
  if (!product) return null;
  return {
    ...variant,
    product,
  };
}
