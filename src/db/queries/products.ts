import { Brand, Category, Product, ProductVariant } from "@prisma/client";
import { db } from "..";
import { handleFetchError } from "@/lib/errors";

export type ProductWithData = Product & { brand: Brand; category: Category };
export type AllProductsWithData = ProductWithData[];
export type AllProductsWithVariants = (ProductWithData & {
  variants: ProductVariant[];
})[];
export type AllProductsWithStock = (ProductWithData & {
  variants: ProductVariant[];
  totalStock: number;
})[];

export const TAKE = 24;

export type FetchResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export async function fetchAllProductsWithData(): Promise<
  FetchResult<AllProductsWithData>
> {
  try {
    const result = await db.product.findMany({
      include: {
        brand: true,
        category: true,
      },
    });
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des produits"
    );
  }
}

export async function fetchAllProductsWithVariants(): Promise<AllProductsWithVariants> {
  return await db.product.findMany({
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });
}

export async function fetchAllProductsWithTotalStock(): Promise<AllProductsWithStock> {
  const products = await fetchAllProductsWithVariants();
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

export async function fetchProductsByCategory(
  slug: string
): Promise<AllProductsWithData> {
  const [name, sex] = decodeURIComponent(slug).split("-");
  if (name === "femme" || name === "homme") {
    return await db.product.findMany({
      where: { sex: name },
      include: { brand: true, category: true },
    });
  }

  return await db.product.findMany({
    where: { category: { name, sex } },
    include: {
      brand: true,
      category: true,
    },
  });
}

export async function fetchProductsByBrand(
  slug: string
): Promise<AllProductsWithData> {
  const [name, sex] = decodeURIComponent(slug).split("-");
  return await db.product.findMany({
    where: { brand: { name, sex } },
    include: {
      brand: true,
      category: true,
    },
  });
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
    console.error(err);
    if (err instanceof Error) return { success: false, error: err.message };
    else
      return {
        success: false,
        error: "Une erreur est survenue lors de la récupération des produits",
      };
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
    console.error(err);
    if (err instanceof Error) return { success: false, error: err.message };
    else
      return {
        success: false,
        error: "Une erreur est survenue lors de la récupération des produits",
      };
  }
}

export type Params = { slug: string; brand: string };
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
    return await fetchProductsWithParams(params);
  } else {
    return await fetchProductsWithSearchParams(params, searchParams);
  }
}

function parseProductsSearchParams(params: Params, searchParams: SearchParams) {
  const [sex, category] = decodeURIComponent(params.slug).split("-");
  let brand = decodeURIComponent(params.brand);
  let categoryNames, brandNames;

  const colorNames = parseSearchParam(searchParams.color);
  const sizeNames = parseSearchParam(searchParams.size);
  const sortBy = {
    [searchParams.sort?.split("-")[0] as string]:
      searchParams.sort?.split("-")[1],
  };
  const page = searchParams.page ? parseInt(searchParams.page) - 1 : 0;

  if (brand === "all" && category === "all") {
    brandNames = parseSearchParam(searchParams.brand);
    categoryNames = parseSearchParam(searchParams.category);
  } else if (brand === "all") {
    brandNames = parseSearchParam(searchParams.brand);
    categoryNames = [category];
  } else {
    categoryNames = parseSearchParam(searchParams.category);
    brandNames = [brand];
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

export async function fetchProductsWithParams({
  slug,
  brand,
}: Params): Promise<FetchResult<AllProductsWithVariants>> {
  const [sex, category] = decodeURIComponent(slug).split("-");

  const brandName = decodeURIComponent(brand);
  try {
    const data = await db.product.findMany({
      where: {
        sex,
        brand: {
          name: brandName === "all" ? undefined : brandName,
        },
        category: {
          name: category === "all" ? undefined : category,
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
    console.error(err);
    if (err instanceof Error) return { success: false, error: err.message };
    else
      return {
        success: false,
        error: "Une erreur est survenue lors de la récupération des produits",
      };
  }
}

export async function fetchProductsWithSearchParams(
  params: Params,
  searchParams: SearchParams
): Promise<FetchResult<AllProductsWithVariants>> {
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
  } = parseProductsSearchParams(params, searchParams);
  try {
    const data = await db.product.findMany({
      where: {
        sex,
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
    console.error(err);
    if (err instanceof Error) return { success: false, error: err.message };
    else
      return {
        success: false,
        error: "Une erreur est survenue lors de la récupération des produits",
      };
  }
}

function parseSearchParam(searchParam: string | string[] | undefined) {
  if (typeof searchParam === "string") return [searchParam];
  if (Array.isArray(searchParam)) return [...searchParam];
}

export async function fetchCategoriesWithParams(
  params: Params,
  searchParams: SearchParams
): Promise<FetchResult<Category[]>> {
  const [sex] = decodeURIComponent(params.slug).split("-");
  let decodedBrand =
    params.brand === "all" ? undefined : [decodeURIComponent(params.brand)];

  const searchParamsBrand = parseSearchParam(searchParams.brand);
  const searchParamsColors = parseSearchParam(searchParams.color);
  const searchParamsSizes = parseSearchParam(searchParams.size);

  try {
    const result = await db.product.findMany({
      where: {
        sex,
        brand: {
          name: { in: searchParamsBrand || decodedBrand },
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
    console.error(err);
    if (err instanceof Error) return { success: false, error: err.message };
    else
      return {
        success: false,
        error: "Une erreur est survenue lors de la récupération des produits",
      };
  }
}

export async function fetchBrandsWithSlug(
  slug: string,
  searchParams: SearchParams
): Promise<FetchResult<Brand[]>> {
  const [sex, category] = decodeURIComponent(slug).split("-");
  const paramsCategory =
    category === "all" || !category ? undefined : [category];
  const searchParamsCategory = parseSearchParam(searchParams.category);
  try {
    const result = await db.product.findMany({
      where: {
        sex,
        category: {
          name: { in: searchParamsCategory || paramsCategory },
        },
      },
      distinct: ["brandId"],
      select: { brand: true },
    });
    return { success: true, data: result.map((item) => item.brand) };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) return { success: false, error: err.message };
    else
      return {
        success: false,
        error: "Une erreur est survenue lors de la récupération des produits",
      };
  }
}

export async function countProductsWithSearchParams(
  params: Params,
  searchParams: SearchParams
): Promise<FetchResult<number>> {
  const { sex, categoryNames, brandNames, colorNames, sizeNames } =
    parseProductsSearchParams(params, searchParams);
  try {
    const result = await db.product.count({
      where: {
        sex,
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
    console.error(err);
    if (err instanceof Error) return { success: false, error: err.message };
    else
      return {
        success: false,
        error: "Une erreur est survenue lors de la récupération des produits",
      };
  }
}
