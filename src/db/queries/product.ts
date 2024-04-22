import { db } from "@/db";
import { Brand, Category, Product, ProductVariant } from "@prisma/client";

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
): Promise<ProductWithVariants | null> {
  return await db.product.findFirst({
    where: { id },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });
}

export async function fetchProductWithTotalStock(
  id: string
): Promise<ProductWithStock> {
  const product = await fetchProductWithVariants(id);
  if (!product) throw new Error("Nous n'avons pas trouvé le produit");

  const totalStock = product?.variants.reduce((acc, variant) => {
    if (!variant.stockQuantity) return acc;
    return acc + variant.stockQuantity;
  }, 0);

  return {
    ...product,
    totalStock,
  };
}
