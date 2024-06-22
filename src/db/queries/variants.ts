import { db } from "@/db";
import { Product, ProductVariant } from "@prisma/client";
import { FetchResult, ProductWithData } from "./products";
import { handleFetchError } from "@/lib/errors";
import { ProductWithVariants } from "./product";

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
export type VariantWithProduct = ProductVariant & { product: ProductWithData };

export async function fetchProductVariantsByColor(
  productId: string
): Promise<FetchResult<ProductVariantsByColor>> {
  try {
    const variants = await db.productVariant.findMany({
      where: { productId },
    });
    if (!variants || variants.length === 0)
      throw new Error("Nous n'avons pas trouvé de variantes");
    const variantsByColor = variants.reduce((acc, variant) => {
      const idx = acc.findIndex((item) => item.color === variant.color);
      if (idx !== -1) {
        acc[idx].totalStock += variant.stockQuantity;
        acc[idx].variants.push({ ...variant });
      } else {
        acc.push({
          variants: [{ ...variant }],
          color: variant.color,
          imagePath: variant.images[0] || null,
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
          imagePath: variant.images[0] || null,
          price: variant.price,
          totalStock: variant.stockQuantity,
          createdAt: variant.createdAt,
        });
      }
      return acc;
    }, [] as ProductVariantsByColor)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function fetchColorsWithProductIds(
  productIds: string[]
): Promise<FetchResult<string[]>> {
  try {
    const result = await db.productVariant.findMany({
      where: {
        productId: { in: productIds },
      },
      distinct: ["color"],
      select: { color: true },
    });
    return { success: true, data: result.map((item) => item.color) };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des couleurs"
    );
  }
}

export async function fetchSizesWithProductIds(
  productIds: string[]
): Promise<FetchResult<string[]>> {
  try {
    const result = await db.productVariant.findMany({
      where: {
        productId: { in: productIds },
      },
      distinct: ["size"],
      select: { size: true },
    });
    return { success: true, data: result.map((item) => item.size) };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des tailles"
    );
  }
}
