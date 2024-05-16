import { notFound } from "next/navigation";
import ProductVariantForm from "./_components/ProductVariantForm";
import { fetchProductWithVariants } from "@/db/queries/product";
import { fetchProductVariantsByColor } from "@/db/queries/variants";

type ProductDetailsCustomerPageProps = {
  params: {
    id: string;
  };
};
async function ProductDetailsCustomerPage({
  params,
}: ProductDetailsCustomerPageProps) {
  if (!params.id) notFound();
  const [productResult, variantsResult] = await Promise.all([
    fetchProductWithVariants(params.id),
    fetchProductVariantsByColor(params.id),
  ]);
  if (!productResult.success) throw new Error(productResult.error);
  if (!variantsResult.success) throw new Error(variantsResult.error);
  if (
    !productResult.data ||
    !variantsResult.data ||
    variantsResult.data.length === 0
  )
    return notFound();

  return (
    <ProductVariantForm
      variantsByColor={variantsResult.data}
      result={productResult.data}
    />
  );
}

export default ProductDetailsCustomerPage;
