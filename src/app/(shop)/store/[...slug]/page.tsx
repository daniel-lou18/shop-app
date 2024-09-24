import PageHeading1 from "@/components/ui/PageHeading1";
import { Params, SearchParams } from "@/db/queries/products";
import { formatSlugToTitle } from "@/lib/parsers";
import ProductsContainer from "./_components/ProductsContainer";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ProductsContainerSkeleton from "../../../../components/skeletons/ProductsContainerSkeleton";
import BaseComponent from "@/components/ui/BaseComponent";

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

export default async function ProductsBySlug({
  params,
  searchParams,
}: StoreProps) {
  return (
    <BaseComponent className="p-4 sm:px-16 sm:pt-8 sm:pb-12">
      <Breadcrumbs slug={params.slug} />
      <PageHeading1>{formatSlugToTitle(params.slug)}</PageHeading1>
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer params={params} searchParams={searchParams} />
      </Suspense>
    </BaseComponent>
  );
}

// export async function generateStaticParams() {
//   const [brandsResult, categoriesResult] = await Promise.all([
//     fetchBrands(),
//     fetchCategories(),
//   ]);
//   if (!brandsResult.success) throw new Error(brandsResult.error);
//   if (!categoriesResult.success) throw new Error(categoriesResult.error);

//   const brandsParams = brandsResult.data.map((brand) => ({
//     slug: brand.sex,
//     brand: brand.name,
//   }));
//   const categoriesParams = categoriesResult.data.map((category) => ({
//     slug: `${category.sex}-${category.name}`,
//     brand: "all",
//   }));
//   return [
//     { slug: "homme-all", brand: "all" },
//     { slug: "femme-all", brand: "all" },
//     ...brandsParams,
//     ...categoriesParams,
//   ];
// }
