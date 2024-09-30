import { notFound } from "next/navigation";
import ProductVariantForm from "./_components/ProductVariantForm";
import {
  VariantsWithProduct,
  fetchVariants,
  fetchVariantsByProductId,
} from "@/db/queries/variants";
import ProductsCarouselItems from "../../../../components/common/carousel/ProductsCarouselItems";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Slug } from "@/types";
import BaseComponent from "@/components/ui/BaseComponent";

type ProductDetailsCustomerPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    color: string;
  };
};

async function ProductDetailsCustomerPage({
  params,
  searchParams,
}: ProductDetailsCustomerPageProps) {
  if (!params.id) notFound();
  const variantsResult = await fetchVariantsByProductId(params.id);
  const variants = variantsResult.success ? variantsResult.data : [];
  // fetch related variants to personalize the carousel
  const relatedVariantsResult = await fetchVariants<VariantsWithProduct>({
    where: {
      product: { categoryId: variants[0]?.product.categoryId },
    },
    take: 15,
  });
  const slug = [
    variants[0]?.product.sex,
    variants[0]?.product.category.name,
    variants[0]?.product.name + " " + variants[0]?.product.brand.name,
  ];

  return (
    <BaseComponent className="max-w-7xl mx-auto p-4 md:pt-8 md:pb-16">
      <Breadcrumbs slug={slug as Slug} type="long" />
      <ProductVariantForm variants={variants} key={searchParams.color} />
      <ProductsCarouselItems
        title="Vous allez aimer"
        items={relatedVariantsResult.success ? relatedVariantsResult.data : []}
        displayTabs={false}
        className="sm:p-0 md:mt-20"
      />
    </BaseComponent>
  );
}

export default ProductDetailsCustomerPage;
