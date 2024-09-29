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
type FetchOptions = {
  where?: {};
  include?: {};
  orderBy?: {};
  take?: number;
};

export async function fetchVariants<T>(
  options?: FetchOptions
): Promise<FetchResult<T>> {
  const defaultOptions = {
    include: { product: { include: { brand: true, category: true } } },
    orderBy: { size: "desc" },
    take: TAKE,
  };
  const finalOptions = { ...defaultOptions, ...options };
  try {
    const result = await db.productVariant.findMany({
      distinct: ["color", "productId"],
      where: finalOptions.where,
      include: finalOptions.include,
      orderBy: finalOptions.orderBy,
      take: finalOptions.take,
    });
    if (!result?.length)
      throw new Error("Nous n'avons pas trouvé de variantes");
    return {
      success: true,
      data: result as unknown as T,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des variantes"
    );
  }
}

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
    if (!result?.length)
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
    if (!result?.length)
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

/* We need to retrieve the variants with the corresponding referenced products
 * If no color name is provided, the query will return 1 result per unique productId
 * If a color name is provided, the query will return 1 result per unique color
 */

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
    if (!result?.length)
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
    if (!variants?.length)
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
