import {
  SearchParams,
  fetchBrandsWithSearchParams,
  fetchCategoriesWithSearchParams,
  fetchColorsWithProductIds,
  fetchProductsWithSearchParams,
  fetchSizesWithProductIds,
} from "@/db/queries/products";
import React from "react";
import PageHeading1 from "@/components/ui/PageHeading1";
import { capitalizeString } from "@/helpers/helpers";
import FilterProductList from "./_components/FilterProductList";
import ProductList from "../products/_components/ProductList";

async function ProductsByCategory({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await fetchProductsWithSearchParams(searchParams);
  const availableBrands = await fetchBrandsWithSearchParams(searchParams);
  const availableCategories = await fetchCategoriesWithSearchParams(
    searchParams
  );
  const availableColors = await fetchColorsWithProductIds(
    products.map((product) => product.id)
  );
  const availableSizes = await fetchSizesWithProductIds(
    products.map((product) => product.id)
  );
  console.log(availableColors);
  console.log(availableSizes);
  return (
    <>
      <PageHeading1>
        {capitalizeString(Object.values(searchParams).join(" "))}
      </PageHeading1>
      <FilterProductList
        availableBrands={availableBrands}
        availableCategories={availableCategories}
        availableColors={availableColors}
        availableSizes={availableSizes}
      />
      <ProductList searchParams={searchParams} />
    </>
  );
}

export default ProductsByCategory;
