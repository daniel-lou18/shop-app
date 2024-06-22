import { notFound } from "next/navigation";
import ProductVariantForm from "./_components/ProductVariantForm";
import { fetchProductWithVariants } from "@/db/queries/product";
import { fetchProductVariantsByColor } from "@/db/queries/variants";
import ProductsCarousel from "../../_components/ProductsCarousel";
import {
  AllProductsWithData,
  fetchAllProductsWithData,
  fetchProducts,
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
  const [productResult, variantsResult] = await Promise.all([
    fetchProductWithVariants(params.id),
    fetchProductVariantsByColor(params.id),
  ]);
  if (!productResult.success) throw new Error(productResult.error);
  if (!variantsResult.success) throw new Error(variantsResult.error);

  const allProductsResult = await fetchAllProductsWithData<AllProductsWithData>(
    {
      where: { categoryId: productResult.data.categoryId },
      include: { brand: true, category: true, variants: false },
      take: 15,
    }
  );
  const slug = [
    productResult.data.sex,
    productResult.data.category.name,
    productResult.data.name + " " + productResult.data.brand.name,
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:px-0 md:py-8 ">
      <Breadcrumbs slug={slug as Slug} type="long" />
      <ProductVariantForm
        variantsByColor={variantsResult.data}
        result={productResult.data}
      />
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
