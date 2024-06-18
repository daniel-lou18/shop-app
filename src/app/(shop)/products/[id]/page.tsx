import { notFound } from "next/navigation";
import ProductVariantForm from "./_components/ProductVariantForm";
import { getProduct } from "@/services/productService";

type ProductDetailsCustomerPageProps = {
  params: {
    id: string;
  };
};
async function ProductDetailsCustomerPage({
  params,
}: ProductDetailsCustomerPageProps) {
  if (!params.id) notFound();
  const result = await getProduct(params.id);
  if (!result.success) throw new Error(result.error);
  // console.log(result.data.variants.edges.at(0).node.selectedOptions);
  // console.log(result.data.variants);

  return (
    <ProductVariantForm
      // variantsByColor={variantsResult.data}
      result={result.data}
    />
  );
}

export default ProductDetailsCustomerPage;
