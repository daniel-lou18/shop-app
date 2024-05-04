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
import ProductList from "@/app/(shop)/products/_components/ProductList";
import DropdownCheckbox from "@/app/(shop)/store/[slug]/[brand]/_components/DropdownCheckbox";
import DropdownFilter from "./_components/DropdownFilter";

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

async function ProductsBySlug({ params, searchParams }: StoreProps) {
  const productIds = await fetchProductIds(params);
  const availableBrands = await fetchBrandsWithSlug(params.slug, searchParams);
  const availableCategories = await fetchCategoriesWithParams(
    params,
    searchParams
  );
  const availableColors = await fetchColorsWithProductIds(productIds);
  const availableSizes = await fetchSizesWithProductIds(productIds);

  return (
    <>
      <PageHeading1>
        {capitalizeString(Object.values(params).join(" "))} {productIds.length}
      </PageHeading1>
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
        <div>
          <DropdownFilter />
        </div>
      </div>
      <ProductList params={params} searchParams={searchParams} />
    </>
  );
}

export default ProductsBySlug;
