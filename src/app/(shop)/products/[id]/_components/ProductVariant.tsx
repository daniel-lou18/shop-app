import ProductVariantForm from "./ProductVariantForm";
import { fetchProductWithVariants } from "@/db/queries/product";
import { notFound } from "next/navigation";
import { fetchProductVariantsByColor } from "@/db/queries/variants";

async function ProductVariant({ id }: { id: string }) {
  const [productResult, variantsResult] = await Promise.all([
    fetchProductWithVariants(id),
    fetchProductVariantsByColor(id),
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

export default ProductVariant;
