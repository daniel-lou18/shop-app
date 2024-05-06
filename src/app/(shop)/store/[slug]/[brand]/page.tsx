import PageHeading1 from "@/components/ui/PageHeading1";
import {
  Params,
  SearchParams,
  TAKE,
  countProductsWithSearchParams,
  fetchBrandsWithSlug,
  fetchCategoriesWithParams,
  fetchColorsWithProductIds,
  fetchProducts,
  fetchSizesWithProductIds,
} from "@/db/queries/products";
import React from "react";
import { formatParamsToString } from "@/helpers/helpers";
import ProductList from "@/app/(shop)/products/_components/ProductList";
import DropdownCheckbox from "@/app/(shop)/store/[slug]/[brand]/_components/DropdownCheckbox";
import DropdownFilter from "./_components/DropdownFilter";
import ProductsTotal from "./_components/ProductsTotal";
import ProductsPagination from "./_components/ProductsPagination";

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

async function ProductsBySlug({ params, searchParams }: StoreProps) {
  const products = await fetchProducts(params, searchParams);
  const productIds = products.map((product) => product.id);
  const availableBrands = await fetchBrandsWithSlug(params.slug, searchParams);
  const availableCategories = await fetchCategoriesWithParams(
    params,
    searchParams
  );
  const availableColors = await fetchColorsWithProductIds(productIds);
  const availableSizes = await fetchSizesWithProductIds(productIds);
  const count = await countProductsWithSearchParams(params, searchParams);

  return (
    <>
      <PageHeading1>{formatParamsToString(params)}</PageHeading1>
      <div className="flex my-6 justify-between">
        <div className="flex gap-4">
          <DropdownCheckbox type="color" data={availableColors} />
          <DropdownCheckbox type="size" data={availableSizes} />
          {params.brand === "all" && params.slug.includes("all") && (
            <>
              <DropdownCheckbox type="brand" data={availableBrands} />
              <DropdownCheckbox type="category" data={availableCategories} />
            </>
          )}
          {params.brand === "all" && !params.slug.includes("all") && (
            <DropdownCheckbox type="brand" data={availableBrands} />
          )}
          {params.brand !== "all" && (
            <DropdownCheckbox type="category" data={availableCategories} />
          )}
        </div>
        <div className="flex gap-4">
          <ProductsTotal total={count} />
          <DropdownFilter />
        </div>
      </div>
      <ProductList products={products} />
      <ProductsPagination take={TAKE} totalItems={count} />
    </>
  );
}

export default ProductsBySlug;
