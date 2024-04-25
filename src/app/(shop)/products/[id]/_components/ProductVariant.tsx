import ProductVariantForm from "./ProductVariantForm";
import { fetchProductWithVariants } from "@/db/queries/product";
import { notFound } from "next/navigation";
import { fetchProductVariantsByColor } from "@/db/queries/variants";

async function ProductVariant({ id }: { id: string }) {
  const result = await fetchProductWithVariants(id);
  const variantsByColor = await fetchProductVariantsByColor(id);
  if (!result || !variantsByColor || variantsByColor.length === 0)
    return notFound();

  return (
    <ProductVariantForm variantsByColor={variantsByColor} result={result} />
  );
}

export default ProductVariant;
