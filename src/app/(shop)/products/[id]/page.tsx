import { notFound } from "next/navigation";
import ProductVariantForm from "./_components/ProductVariantForm";
import { fetchProductWithVariants } from "@/db/queries/product";
import { fetchProductVariantsByColor } from "@/db/queries/variants";
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
  // console.log(result.data.variants.edges);

  // const [productResult, variantsResult] = await Promise.all([
  //   fetchProductWithVariants(params.id),
  //   fetchProductVariantsByColor(params.id),
  // ]);
  // if (!productResult.success) throw new Error(productResult.error);
  // if (!variantsResult.success) throw new Error(variantsResult.error);

  return (
    <ProductVariantForm
      // variantsByColor={variantsResult.data}
      result={result.data}
    />
  );
}

export default ProductDetailsCustomerPage;
