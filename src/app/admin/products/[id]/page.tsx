import ProductForm from "./_components/ProductForm";
import { db } from "@/db";
import { Brand, Category, Product, ProductVariant } from "@prisma/client";
import { notFound } from "next/navigation";
import * as actions from "@/actions/variant";

type ProductDetailsProps = {
  params: {
    id: string;
  };
};

export type VariantByColor = {
  color: string;
  imagePath: string | null;
  price: number;
  _sum: { stockQuantity: number | null };
};

export type EditData = {
  product: Product & { brand: Brand; category: Category };
  brands: Brand[];
  categories: Category[];
  variants: ProductVariant[] | null | { errors: ["string"] };
  variantsByColor: VariantByColor[];
};

export type AddData = {
  brands: Brand[];
  categories: Category[];
};

async function ProductDetailsAdmin({ params }: ProductDetailsProps) {
  const product = await db.product.findFirst({
    where: { id: params.id },
    include: { brand: true, category: true },
  });
  const brands: Brand[] = await db.brand.findMany();
  const categories: Category[] = await db.category.findMany();
  const variants = await actions.getAllVariants({ id: params.id });
  const variantsByColor = await db.productVariant.groupBy({
    by: ["color", "imagePath", "price"],
    where: { productId: params.id },
    _sum: { stockQuantity: true },
  });

  if (!product || brands.length === 0 || categories.length === 0)
    return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm
        type="edit"
        id={params.id}
        data={{ product, brands, categories, variants, variantsByColor }}
      />
    </main>
  );
}

export default ProductDetailsAdmin;
