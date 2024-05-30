import { db } from "@/db";
import { handleFetchError } from "@/lib/errors";
import { Brand, Category, Product, ProductVariant } from "@prisma/client";
import { FetchResult } from "./products";

export type ProductWithVariants = Product & {
  brand: Brand;
  category: Category;
  variants: ProductVariant[];
};

export type ProductWithStock = ProductWithVariants & {
  totalStock: number;
};

export async function fetchProductWithVariants(
  id: string
): Promise<FetchResult<ProductWithVariants>> {
  try {
    const result = await db.product.findFirst({
      where: { id },
      include: {
        brand: true,
        category: true,
        variants: true,
      },
    });
    if (!result) throw new Error("Nous n'avons pas trouvé le produit");

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération du produit"
    );
  }
}

export async function fetchProductWithTotalStock(
  id: string
): Promise<FetchResult<ProductWithStock>> {
  try {
    const product = await fetchProductWithVariants(id);
    if (!product.success) throw new Error(product.error);
    if (!product.data)
      throw new Error(
        "Nous n'avons pas trouvé de produit correspondant à cet ID."
      );

    const totalStock = (product.data as ProductWithVariants).variants.reduce(
      (acc, variant) => {
        if (!variant.stockQuantity) return acc;
        return acc + variant.stockQuantity;
      },
      0
    );

    return {
      success: true,
      data: { ...product.data, totalStock },
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération du produit"
    );
  }
}
