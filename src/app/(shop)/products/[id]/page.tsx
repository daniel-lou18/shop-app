import { notFound } from "next/navigation";
import ProductVariantForm from "./_components/ProductVariantForm";
import { fetchVariantsByProductId } from "@/db/queries/variants";
import ProductsCarousel from "../../_components/ProductsCarousel";
import {
  fetchProductsWithData,
  ProductsWithVariants,
} from "@/db/queries/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Slug } from "@/types";

type ProductDetailsCustomerPageProps = {
  params: {
    id: string;
  };
};
async function ProductDetailsCustomerPage({
  params,
}: ProductDetailsCustomerPageProps) {
  if (!params.id) notFound();
  const variantsResult = await fetchVariantsByProductId(params.id);
  if (!variantsResult.success) throw new Error(variantsResult.error);

  const allProductsResult = await fetchProductsWithData<ProductsWithVariants>({
    where: { categoryId: variantsResult.data.at(0)?.product.categoryId },
    take: 15,
  });
  const slug = [
    variantsResult.data.at(0)?.product.sex,
    variantsResult.data.at(0)?.product.category.name,
    variantsResult.data.at(0)?.product.name +
      " " +
      variantsResult.data.at(0)?.product.brand.name,
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:px-0 md:py-8 ">
      <Breadcrumbs slug={slug as Slug} type="long" />
      <ProductVariantForm variants={variantsResult.data} />
      <ProductsCarousel
        title="Vous allez aimer"
        items={allProductsResult.success ? allProductsResult.data : []}
        displayTabs={false}
        className="sm:p-0 md:mt-20"
      />
    </div>
  );
}

export default ProductDetailsCustomerPage;
