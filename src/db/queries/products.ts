import { Brand, Category, Product, ProductVariant } from "@prisma/client";
import { db } from "..";
import { AllBrands } from "./brands";

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

export type SearchParams = {
  category?: string;
  brand?: string;
  size?: string;
  color?: string;
  sex: "homme" | "femme";
};

export async function fetchProductsWithSearchParams(
  searchParams: SearchParams
): Promise<AllProductsWithVariants> {
  return db.product.findMany({
    where: {
      sex: searchParams.sex || undefined,
      brand: {
        name: searchParams.brand || undefined,
        sex: searchParams.sex || undefined,
      },
      category: {
        name: searchParams.category || undefined,
        sex: searchParams.sex || undefined,
      },
      variants: {
        some: {
          color: searchParams.color || undefined,
          size: searchParams.size || undefined,
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

export async function fetchBrandsWithSearchParams(
  searchParams: SearchParams
): Promise<Brand[]> {
  const result = await db.product.findMany({
    where: {
      sex: searchParams.sex || undefined,
      brand: {
        name: searchParams.brand || undefined,
        sex: searchParams.sex || undefined,
      },
      category: {
        name: searchParams.category || undefined,
        sex: searchParams.sex || undefined,
      },
      variants: {
        some: {
          color: searchParams.color || undefined,
          size: searchParams.size || undefined,
        },
      },
    },
    distinct: ["brandId"],
    select: { brand: true },
  });
  return result.map((item) => item.brand);
}

export async function fetchCategoriesWithSearchParams(
  searchParams: SearchParams
): Promise<Category[]> {
  const result = await db.product.findMany({
    where: {
      sex: searchParams.sex || undefined,
      brand: {
        name: searchParams.brand || undefined,
        sex: searchParams.sex || undefined,
      },
      category: {
        name: searchParams.category || undefined,
        sex: searchParams.sex || undefined,
      },
      variants: {
        some: {
          color: searchParams.color || undefined,
          size: searchParams.size || undefined,
        },
      },
    },
    distinct: ["categoryId"],
    select: { category: true },
  });
  return result.map((item) => item.category);
}

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
