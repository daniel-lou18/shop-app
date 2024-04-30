import PageHeading1 from "@/components/ui/PageHeading1";
import {
  Params,
  SearchParams,
  fetchBrandsWithSlug,
  fetchCategoriesWithParams,
  fetchColorsWithProductIds,
  fetchProductIds,
  fetchSizesWithProductIds,
} from "@/db/queries/products";
import React from "react";
import { capitalizeString } from "@/helpers/helpers";
import DropdownFilter from "@/components/ui/DropdownFilter";
import ProductList from "@/app/(shop)/products/_components/ProductList";
import DropdownCheckbox from "@/components/ui/DropdownCheckbox";

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

async function ProductsBySlug({ params, searchParams }: StoreProps) {
  const productIds = await fetchProductIds(params);
  const availableBrands = await fetchBrandsWithSlug(params.slug);
  const availableCategories = await fetchCategoriesWithParams(params);
  const availableColors = await fetchColorsWithProductIds(productIds);
  const availableSizes = await fetchSizesWithProductIds(productIds);

  return (
    <>
      <PageHeading1>
        {capitalizeString(Object.values(params).join(" "))}
      </PageHeading1>
      <div className="flex gap-4 my-6">
        <DropdownCheckbox type="color" data={availableColors} />
        <DropdownCheckbox type="size" data={availableSizes} />
        {params.brand === "all" && (
          <DropdownCheckbox type="brand" data={availableBrands} />
        )}
        {params.brand !== "all" && (
          <DropdownCheckbox type="category" data={availableCategories} />
        )}
      </div>
      <ProductList params={params} searchParams={searchParams} />
    </>
  );
}

export default ProductsBySlug;
