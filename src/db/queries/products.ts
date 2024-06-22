import { Brand, Category, Product, ProductVariant, Sex } from "@prisma/client";
import { db } from "..";
import { handleFetchError } from "@/lib/errors";
import { Slug } from "@/types";

export type ProductWithData = Product & { brand: Brand; category: Category };
export type ProductsWithData = ProductWithData[];
export type ProductsWithVariants = (ProductWithData & {
  variants: ProductVariant[];
})[];
export type ProductsWithStock = (ProductWithData & {
  variants: ProductVariant[];
  totalStock: number;
})[];
export const TAKE = 12;

export type FetchResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
export type FetchOptions = {
  where?: {};
  include?: {
    brand?: boolean;
    category?: boolean;
    variants?: boolean;
  };
  orderBy?: {};
  take?: number;
  addTotalStock?: boolean;
};

export async function fetchProductsWithData<T>(
  options?: FetchOptions
): Promise<FetchResult<T>> {
  const defaultOptions = {
    include: {
      brand: true,
      category: true,
      variants: true,
    },
    addTotalStock: false,
  };
  const finalOptions = { ...defaultOptions, ...options };

  try {
    const result = await db.product.findMany({
      include: finalOptions.include,
      where: finalOptions.where,
      orderBy: finalOptions.orderBy,
      take: finalOptions.take,
    });

    if (!result || result.length === 0)
      throw new Error("Nous n'avons retrouvé aucun produit");

    const data = finalOptions.addTotalStock
      ? addTotalStockToProducts(result as ProductsWithVariants)
      : result;
    return {
      success: true,
      data: data as unknown as T,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des produits"
    );
  }
}

export async function fetchProductsWithTotalStockByIds(
  productIds: string[]
): Promise<FetchResult<ProductsWithStock>> {
  try {
    if (productIds.length === 0) throw new Error("Ids produits manquants");
    const result = await db.product.findMany({
      where: { id: { in: productIds } },
      include: {
        brand: true,
        category: true,
        variants: true,
      },
    });
    if (!result || result.length === 0)
      throw new Error(
        "Nous n'avons pas trouvé de produits correspondants aux ids"
      );
    return { success: true, data: addTotalStockToProducts(result) };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des produits"
    );
  }
}

export type Params = { slug: Slug };
export type SearchParams = {
  category?: string | string[];
  brand?: string | string[];
  size?: string | string[];
  color?: string | string[];
  sort?: string;
  page?: string;
};

export async function fetchProducts(
  params: Params,
  searchParams: SearchParams
) {
  // return {
  //   success: false,
  //   error: "Une erreur est survenue lors de la récupération des produits",
  // };
  if (Object.keys(searchParams).length === 0) {
    return await fetchProductsWithParams(params.slug);
  } else {
    return await fetchProductsWithSearchParams(params.slug, searchParams);
  }
}

function parseProductsSearchParams(slug: Slug, searchParams: SearchParams) {
  const [sex, category, brand] = slug;
  const categoryName = category && decodeURIComponent(category);
  const brandName = brand && decodeURIComponent(brand);
  let categoryNames, brandNames;
  const colorNames = parseSearchParam(searchParams.color);
  const sizeNames = parseSearchParam(searchParams.size);
  const sortBy = {
    [searchParams.sort?.split("-")[0] as string]:
      searchParams.sort?.split("-")[1],
  };
  const page = searchParams.page ? parseInt(searchParams.page) - 1 : 0;
  if (!category && !brand) {
    brandNames = parseSearchParam(searchParams.brand);
    categoryNames = parseSearchParam(searchParams.category);
  } else if (brand) {
    categoryNames = parseSearchParam(searchParams.category);
    brandNames = brandName ? [brandName] : undefined;
  } else {
    brandNames = parseSearchParam(searchParams.brand);
    categoryNames = categoryName ? [categoryName] : undefined;
  }
  return {
    sex,
    categoryNames,
    brandNames,
    colorNames,
    sizeNames,
    sortBy,
    page,
  };
}

export async function fetchProductsWithParams(
  slug: Slug
): Promise<FetchResult<ProductsWithVariants>> {
  const [sex, category, brand] = slug;
  const categoryName = category && decodeURIComponent(category);
  const brandName = brand && decodeURIComponent(brand);

  try {
    const data = await db.product.findMany({
      where: {
        sex,
        brand: {
          name: brandName,
        },
        category: {
          name: categoryName === "brandstore" ? undefined : categoryName,
        },
      },
      include: { brand: true, category: true, variants: true },
      take: TAKE,
    });
    return {
      success: true,
      data,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des produits"
    );
  }
}

export async function fetchProductsWithSearchParams(
  slug: Slug,
  searchParams: SearchParams
): Promise<FetchResult<ProductsWithVariants>> {
  // return {
  //   success: false,
  //   error: "Une erreur est survenue lors de la récupération des produits.",
  // };
  const {
    sex,
    categoryNames,
    brandNames,
    colorNames,
    sizeNames,
    sortBy,
    page,
  } = parseProductsSearchParams(slug, searchParams);
  const typedSex = sex as Sex;
  try {
    const data = await db.product.findMany({
      where: {
        sex: typedSex,
        category: {
          name: { in: categoryNames },
        },
        brand: {
          name: { in: brandNames },
        },
        variants: {
          some: {
            AND: [
              {
                color: {
                  in: colorNames,
                },
              },
              {
                size: {
                  in: sizeNames,
                },
              },
              {
                stockQuantity: {
                  gt: 0,
                },
              },
            ],
          },
        },
      },
      include: {
        brand: true,
        category: true,
        variants: true,
      },
      orderBy: sortBy,
      skip: TAKE * page,
      take: TAKE,
    });
    return {
      success: true,
      data,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des produits"
    );
  }
}

function parseSearchParam(searchParam: string | string[] | undefined) {
  if (typeof searchParam === "string") return [searchParam];
  if (Array.isArray(searchParam)) return [...searchParam];
}

export async function fetchCategoriesWithParams(
  slug: Slug,
  searchParams: SearchParams
): Promise<FetchResult<Category[]>> {
  const [sex, _, brand] = slug;
  let decodedBrandArray = brand ? [decodeURIComponent(brand)] : undefined;

  const searchParamsBrand = parseSearchParam(searchParams.brand);
  const searchParamsColors = parseSearchParam(searchParams.color);
  const searchParamsSizes = parseSearchParam(searchParams.size);

  try {
    const result = await db.product.findMany({
      where: {
        sex,
        brand: {
          name: { in: searchParamsBrand || decodedBrandArray },
        },
        variants: {
          some: {
            color: {
              in: searchParamsColors,
            },
            size: {
              in: searchParamsSizes,
            },
          },
        },
      },
      distinct: ["categoryId"],
      select: { category: true },
    });
    return { success: true, data: result.map((item) => item.category) };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des catégories"
    );
  }
}

export async function fetchBrandsWithSlug(
  slug: Slug,
  searchParams: SearchParams
): Promise<FetchResult<Brand[]>> {
  const [sex, category] = slug;
  const decodedCategoryArray =
    category || category === "brandstore"
      ? [decodeURIComponent(category)]
      : undefined;
  const searchParamsCategory = parseSearchParam(searchParams.category);
  try {
    const result = await db.product.findMany({
      where: {
        sex,
        category: {
          name: { in: searchParamsCategory || decodedCategoryArray },
        },
      },
      distinct: ["brandId"],
      select: { brand: true },
    });
    return { success: true, data: result.map((item) => item.brand) };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des marques"
    );
  }
}

export async function countProductsWithSearchParams(
  slug: Slug,
  searchParams: SearchParams
): Promise<FetchResult<number>> {
  const { sex, categoryNames, brandNames, colorNames, sizeNames } =
    parseProductsSearchParams(slug, searchParams);
  const typedSex = sex as Sex;

  try {
    const result = await db.product.count({
      where: {
        sex: typedSex,
        category: {
          name: { in: categoryNames },
        },
        brand: {
          name: { in: brandNames },
        },
        variants: {
          some: {
            color: {
              in: colorNames,
            },
            size: {
              in: sizeNames,
            },
          },
        },
      },
    });
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors du comptage des produits"
    );
  }
}
// Fonctions helper

export function addTotalStockToProducts(products: ProductsWithVariants) {
  return products.map((product) => {
    const totalStock = product.variants.reduce((acc, variant) => {
      if (!variant.stockQuantity) return acc;
      return acc + variant.stockQuantity;
    }, 0);
    return {
      ...product,
      totalStock,
    };
  });
}
