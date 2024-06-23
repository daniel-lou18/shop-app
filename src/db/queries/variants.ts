import { db } from "@/db";
import { ProductVariant } from "@prisma/client";
import {
  FetchResult,
  ProductWithData,
  SearchParams,
  TAKE,
  parseProductsSearchParams,
} from "./products";
import { handleFetchError } from "@/lib/errors";
import { Slug } from "@/types";

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
export type VariantsWithProduct = VariantWithProduct[];

export async function fetchVariantsByParams(
  slug: Slug
): Promise<FetchResult<VariantsWithProduct>> {
  const [sex, category, brand] = slug;
  const categoryName = category && decodeURIComponent(category);
  const brandName = brand && decodeURIComponent(brand);
  try {
    const result = await db.productVariant.findMany({
      where: {
        stockQuantity: { gt: 0 },
        product: {
          sex,
          category: {
            name: categoryName === "brandstore" ? undefined : categoryName,
          },
          brand: { name: brandName },
        },
      },
      include: { product: { include: { brand: true, category: true } } },
      orderBy: { product: { brand: { name: "asc" } } },
      take: TAKE,
    });
    if (!result || result.length === 0)
      throw new Error("Nous n'avons pas trouvé de variantes");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des variantes"
    );
  }
}

export async function fetchVariantsByProductId(
  id: string
): Promise<FetchResult<VariantsWithProduct>> {
  try {
    const result = await db.productVariant.findMany({
      distinct: ["color", "size"],
      where: { productId: id },
      include: { product: { include: { brand: true, category: true } } },
      orderBy: { product: { brand: { name: "asc" } } },
    });
    if (!result || result.length === 0)
      throw new Error("Nous n'avons pas trouvé de variantes");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des variantes"
    );
  }
}

export async function searchVariantsWithProduct(
  slug: Slug,
  searchParams: SearchParams
): Promise<FetchResult<VariantsWithProduct>> {
  const {
    sex,
    categoryNames,
    brandNames,
    colorNames,
    sizeNames,
    sortBy,
    page,
  } = parseProductsSearchParams(slug, searchParams);

  try {
    const result = await db.productVariant.findMany({
      distinct:
        colorNames && colorNames.length > 0
          ? ["color", "productId"]
          : ["productId"],
      where: {
        stockQuantity: { gt: 0 },
        color: { in: colorNames },
        size: { in: sizeNames },
        product: {
          sex,
          category: { name: { in: categoryNames } },
          brand: { name: { in: brandNames } },
        },
      },
      include: { product: { include: { brand: true, category: true } } },
      orderBy: sortBy,
      skip: TAKE * page,
      take: TAKE,
    });
    if (!result || result.length === 0)
      throw new Error("Nous n'avons pas trouvé de variantes");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des variantes"
    );
  }
}

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
