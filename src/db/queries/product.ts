import { db } from "@/db";
import { Brand, Category, Product, ProductVariant } from "@prisma/client";

type ProductWithVariants = Product & {
  brand: Brand;
  category: Category;
  variants: ProductVariant[];
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
