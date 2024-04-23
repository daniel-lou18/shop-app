import ProductVariantForm from "./ProductVariantForm";
import { fetchProductWithVariants } from "@/db/queries/product";
import { notFound } from "next/navigation";
import { fetchProductVariantsByColor } from "@/db/queries/variants";

async function ProductVariant({ id }: { id: string }) {
  const result = await fetchProductWithVariants(id);
  const variantsByColor = await fetchProductVariantsByColor(id);
  if (!result) return notFound();

  const brandName = result?.brand.name.toUpperCase() || null;
  const productName = result?.name || null;
  const productDescription = result?.description || null;

  return (
    <ProductVariantForm
      variantsByColor={variantsByColor}
      brandName={brandName}
      productName={productName}
      productDescription={productDescription}
    />
  );
}

export default ProductVariant;
