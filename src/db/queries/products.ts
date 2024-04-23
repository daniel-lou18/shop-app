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
  const [name, sex] = slug.split("-");
  return await db.product.findMany({
    where: { category: { name }, sex },
    include: {
      brand: true,
      category: true,
    },
  });
}
