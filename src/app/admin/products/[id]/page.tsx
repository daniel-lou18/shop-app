import { notFound } from "next/navigation";
import { fetchBrands } from "@/db/queries/brands";
import { fetchCategories } from "@/db/queries/categories";
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
  const [productResult, brandsResult, categoriesResult, variantsResult] =
    await Promise.all([
      fetchProductWithTotalStock(params.id),
      fetchBrands(),
      fetchCategories(),
      fetchProductVariantsByColor(params.id),
    ]);

  if (!productResult.success) throw new Error(productResult.error);
  if (!brandsResult.success) throw new Error(brandsResult.error);
  if (!categoriesResult.success) throw new Error(categoriesResult.error);
  if (!variantsResult.success) throw new Error(variantsResult.error);

  if (
    !productResult.data ||
    brandsResult.data.length === 0 ||
    categoriesResult.data.length === 0
  )
    return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm
        type="edit"
        product={productResult.data}
        brands={brandsResult.data}
        categories={categoriesResult.data}
        variantsByColor={variantsResult.data}
      />
      <ProductVariants product={productResult.data} type="edit" />
    </main>
  );
}

export default ProductDetailsAdmin;
