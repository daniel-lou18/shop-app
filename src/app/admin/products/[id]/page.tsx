import { notFound } from "next/navigation";
import { fetchAllBrands } from "@/db/queries/brands";
import { fetchAllCategories } from "@/db/queries/categories";
import { fetchProductWithTotalStock } from "@/db/queries/product";

import ProductVariants from "./_components/ProductVariants";
import { fetchProductVariantsByColor } from "@/db/queries/variants";
import ProductForm from "./_components/ProductForm";

type ProductDetailsProps = {
  params: {
    id: string;
  };
};

async function ProductDetailsAdmin({ params }: ProductDetailsProps) {
  const product = await fetchProductWithTotalStock(params.id);
  const brands = await fetchAllBrands();
  const categories = await fetchAllCategories();
  const variantsByColor = await fetchProductVariantsByColor(params.id);

  if (!product || brands.length === 0 || categories.length === 0)
    return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm
        type="edit"
        product={product}
        brands={brands}
        categories={categories}
        variantsByColor={variantsByColor}
      />
      <ProductVariants product={product} type="edit" />
    </main>
  );
}

export default ProductDetailsAdmin;
