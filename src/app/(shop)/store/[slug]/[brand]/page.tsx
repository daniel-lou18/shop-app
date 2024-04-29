import PageHeading1 from "@/components/ui/PageHeading1";
import {
  Params,
  SearchParams,
  fetchBrandsWithSlug,
  fetchCategoriesWithParams,
  fetchColorsWithProductIds,
  fetchProducts,
  fetchSizesWithProductIds,
} from "@/db/queries/products";
import React from "react";
import { capitalizeString } from "@/helpers/helpers";
import DropdownFilter from "@/components/ui/DropdownFilter";
import ProductList from "@/app/(shop)/products/_components/ProductList";

async function ProductsBySlug({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const products = await fetchProducts(params, searchParams);
  const availableBrands = await fetchBrandsWithSlug(params.slug);
  const availableCategories = await fetchCategoriesWithParams(params);
  const availableColors = await fetchColorsWithProductIds(
    products.map((product) => product.id)
  );
  const availableSizes = await fetchSizesWithProductIds(
    products.map((product) => product.id)
  );

  return (
    <>
      <PageHeading1>
        {capitalizeString(Object.values(params).join(" "))}
      </PageHeading1>
      <div className="flex gap-4 my-6">
        <DropdownFilter type="color" data={availableColors} />
        <DropdownFilter type="size" data={availableSizes} />
        {params.brand === "all" && (
          <DropdownFilter type="brand" data={availableBrands} />
        )}
        {params.brand !== "all" && (
          <DropdownFilter type="category" data={availableCategories} />
        )}
      </div>
      <ProductList products={products} />
    </>
  );
}

export default ProductsBySlug;
