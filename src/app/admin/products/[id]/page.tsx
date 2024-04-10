import ProductForm from "./_components/ProductForm";
import { db } from "@/db";
import { Brand, Category } from "@prisma/client";
import { notFound } from "next/navigation";
import * as actions from "@/actions/variant";

type ProductDetailsProps = {
  params: {
    id: string;
  };
};

async function ProductDetailsAdmin({ params }: ProductDetailsProps) {
  const product = await db.product.findFirst({
    where: { id: params.id },
    include: { brand: true, category: true },
  });
  const brands: Brand[] = await db.brand.findMany();
  const categories: Category[] = await db.category.findMany();
  const variants = await actions.getAllVariants({ id: params.id });
  console.log(variants);

  if (!product || brands.length === 0 || categories.length === 0)
    return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm
        type="edit"
        id={params.id}
        product={product}
        brands={brands}
        categories={categories}
        variants={variants}
      />
    </main>
  );
}

export default ProductDetailsAdmin;
