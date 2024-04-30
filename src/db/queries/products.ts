import { Brand, Category, Product, ProductVariant } from "@prisma/client";
import { db } from "..";

export type ProductWithData = Product & { brand: Brand; category: Category };
export type AllProductsWithData = ProductWithData[];
export type AllProductsWithVariants = (ProductWithData & {
  variants: ProductVariant[];
})[];
export type AllProductsWithStock = (ProductWithData & {
  variants: ProductVariant[];
  totalStock: number;
})[];

export async function fetchAllProductsWithData(): Promise<AllProductsWithData> {
  return await db.product.findMany({
    include: {
      brand: true,
      category: true,
    },
  });
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

// export async function fetchBrandsWithSearchParams(
//   searchParams: SearchParams
// ): Promise<Brand[]> {
//   const result = await db.product.findMany({
//     where: {
//       sex: searchParams.sex || undefined,
//       brand: {
//         name: searchParams.brand || undefined,
//         sex: searchParams.sex || undefined,
//       },
//       category: {
//         name: searchParams.category || undefined,
//         sex: searchParams.sex || undefined,
//       },
//       variants: {
//         some: {
//           color: searchParams.color || undefined,
//           size: searchParams.size || undefined,
//         },
//       },
//     },
//     distinct: ["brandId"],
//     select: { brand: true },
//   });
//   return result.map((item) => item.brand);
// }

// export async function fetchCategoriesWithSearchParams(
//   searchParams: SearchParams
// ): Promise<Category[]> {
//   const result = await db.product.findMany({
//     where: {
//       sex: searchParams.sex || undefined,
//       brand: {
//         name: searchParams.brand || undefined,
//         sex: searchParams.sex || undefined,
//       },
//       category: {
//         name: searchParams.category || undefined,
//         sex: searchParams.sex || undefined,
//       },
//       variants: {
//         some: {
//           color: searchParams.color || undefined,
//           size: searchParams.size || undefined,
//         },
//       },
//     },
//     distinct: ["categoryId"],
//     select: { category: true },
//   });
//   return result.map((item) => item.category);
// }

export async function fetchColorsWithProductIds(
  productIds: string[]
): Promise<string[]> {
  const result = await db.productVariant.findMany({
    where: {
      productId: { in: productIds },
    },
    distinct: ["color"],
    select: { color: true },
  });
  return result.map((item) => item.color);
}

export async function fetchSizesWithProductIds(
  productIds: string[]
): Promise<string[]> {
  const result = await db.productVariant.findMany({
    where: {
      productId: { in: productIds },
    },
    distinct: ["size"],
    select: { size: true },
  });
  return result.map((item) => item.size);
}

export async function fetchBrandsWithSlug(slug: string): Promise<Brand[]> {
  const [sex, category] = decodeURIComponent(slug).split("-");
  const result = await db.product.findMany({
    where: {
      sex,
      category: {
        name: category,
      },
    },
    distinct: ["brandId"],
    select: { brand: true },
  });
  return result.map((item) => item.brand);
}

export type Params = { slug: string; brand: string };
export type SearchParams = {
  category?: string;
  brand?: string;
  size?: string;
  color?: string;
};

export async function fetchProducts(
  params: Params,
  searchParams: SearchParams
) {
  if (Object.keys(searchParams).length === 0) {
    return await fetchProductsWithParams(params);
  } else {
    return await fetchProductsWithSearchParams(params, searchParams);
  }
}

export async function fetchProductsWithParams({
  slug,
  brand,
}: Params): Promise<AllProductsWithVariants> {
  const [sex, category] = decodeURIComponent(slug).split("-");
  const brandName = decodeURIComponent(brand);
  return await db.product.findMany({
    where: {
      sex,
      brand: {
        name: brandName === "all" ? undefined : brandName,
      },
      category: {
        name: category,
      },
    },
    include: { brand: true, category: true, variants: true },
  });
}

export async function fetchProductIds({
  slug,
  brand,
}: Params): Promise<string[]> {
  const [sex, category] = decodeURIComponent(slug).split("-");
  const brandName = decodeURIComponent(brand);
  const result = await db.product.findMany({
    where: {
      sex,
      brand: {
        name: brandName === "all" ? undefined : brandName,
      },
      category: {
        name: category,
      },
    },
    select: { id: true },
  });
  return result.map((item) => item.id);
}

function parseProductsSearchParams(params: Params, searchParams: SearchParams) {
  const [sex, category] = decodeURIComponent(params.slug).split("-");
  let brand = decodeURIComponent(params.brand);
  let categoryNames, brandNames, colorNames, sizeNames;

  if (Array.isArray(searchParams.color)) {
    colorNames = [...searchParams.color];
  }
  if (typeof searchParams.color === "string") {
    colorNames = [searchParams.color];
  }

  if (Array.isArray(searchParams.size)) {
    sizeNames = [...searchParams.size];
  }
  if (typeof searchParams.size === "string") {
    sizeNames = [searchParams.size];
  }

  if (brand === "all") {
    if (Array.isArray(searchParams.brand)) {
      brandNames = [...searchParams.brand];
    }
    if (typeof searchParams.brand === "string") {
      brandNames = [searchParams.brand];
    }
    categoryNames = [category];
  } else {
    if (Array.isArray(searchParams.category)) {
      categoryNames = [...searchParams.category];
    }
    if (typeof searchParams.category === "string") {
      categoryNames = [searchParams.category];
    }
    brandNames = [brand];
  }
  return { sex, categoryNames, brandNames, colorNames, sizeNames };
}

export async function fetchProductsWithSearchParams(
  params: Params,
  searchParams: SearchParams
): Promise<AllProductsWithVariants> {
  const { sex, categoryNames, brandNames, colorNames, sizeNames } =
    parseProductsSearchParams(params, searchParams);
  return db.product.findMany({
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
  });
}

export async function fetchCategoriesWithParams({
  slug,
  brand,
}: {
  slug: string;
  brand: string;
}): Promise<Category[]> {
  const decodedBrand = decodeURIComponent(brand);
  const result = await db.product.findMany({
    where: {
      sex: slug,
      brand: {
        name: decodedBrand,
      },
    },
    distinct: ["categoryId"],
    select: { category: true },
  });
  return result.map((item) => item.category);
}
