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

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

async function ProductsBySlug({ params, searchParams }: StoreProps) {
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
      <ProductsList products={products} />
      <ProductsPagination take={TAKE} totalItems={count} />
    </>
  );
}

export default ProductsBySlug;
