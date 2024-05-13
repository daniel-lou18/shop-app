import PageHeading1 from "@/components/ui/PageHeading1";
import {
  Params,
  SearchParams,
  countProductsWithSearchParams,
  fetchProductsWithParams,
  fetchBrandsWithSlug,
  fetchCategoriesWithParams,
  fetchColorsWithProductIds,
  fetchSizesWithProductIds,
} from "@/db/queries/products";
import React from "react";
import { formatParamsToString } from "@/helpers/helpers";
import ProductsList from "@/app/(shop)/store/[slug]/[brand]/_components/ProductsList";
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
  const result = await fetchProductsWithParams(params);
  if (!result.success) throw new Error(result.error);
  const products = result.data;
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
      <ProductsList
        products={products}
        availableBrands={availableBrands}
        availableCategories={availableCategories}
        availableColors={availableColors}
        availableSizes={availableSizes}
        count={count}
      />
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
