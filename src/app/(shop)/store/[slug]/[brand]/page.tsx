import PageHeading1 from "@/components/ui/PageHeading1";
import {
  Params,
  SearchParams,
  TAKE,
  countProductsWithSearchParams,
  fetchProducts,
} from "@/db/queries/products";
import React, { Suspense } from "react";
import { formatParamsToString } from "@/helpers/helpers";
import ProductsList from "@/app/(shop)/store/[slug]/[brand]/_components/ProductsList";
import ProductsPagination from "./_components/ProductsPagination";
import ProductsControls from "./_components/ProductsControls";
import Loader from "@/components/ui/Loader";
import ProductsControlsSkeleton from "./_components/ProductsControlsSkeleton";
import { fetchAllBrands } from "@/db/queries/brands";
import { fetchAllCategories } from "@/db/queries/categories";

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

export default async function ProductsBySlug({
  params,
  searchParams,
}: StoreProps) {
  const products = await fetchProducts(params, searchParams);
  const productIds = products.map((product) => product.id);
  const count = await countProductsWithSearchParams(params, searchParams);

  return (
    <>
      <PageHeading1>{formatParamsToString(params)}</PageHeading1>
      <Suspense fallback={<ProductsControlsSkeleton params={params} />}>
        <ProductsControls
          params={params}
          searchParams={searchParams}
          productIds={productIds}
          count={count}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ProductsList products={products} />
        <ProductsPagination take={TAKE} totalItems={count} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const brands = await fetchAllBrands();
  const categories = await fetchAllCategories();
  const brandsParams = brands.map((brand) => ({
    slug: brand.sex,
    brand: brand.name,
  }));
  const categoriesParams = categories.map((category) => ({
    slug: `${category.sex}-${category.name}`,
    brand: "all",
  }));
  return [
    { slug: "homme-all", brand: "all" },
    { slug: "femme-all", brand: "all" },
    ...brandsParams,
    ...categoriesParams,
  ];
}
