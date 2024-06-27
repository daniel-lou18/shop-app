import {
  Params,
  SearchParams,
  countProductsWithSearchParams,
  fetchBrandsWithSlug,
  fetchCategoriesWithParams,
} from "@/db/queries/products";
import {
  fetchColorsWithProductIds,
  fetchSizesWithProductIds,
  fetchVariantsByParams,
} from "@/db/queries/variants";
import ProductsList from "@/app/(shop)/store/[...slug]/_components/ProductsList";
import { fetchBrands } from "@/db/queries/brands";
import { fetchCategories } from "@/db/queries/categories";

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

export default async function ProductsContainer({
  params,
  searchParams,
}: StoreProps) {
  const [
    variantsResult,
    brandsResult,
    categoriesResult,
    countResult,
    allBrandsResult,
    allCategoriesResult,
  ] = await Promise.all([
    fetchVariantsByParams(params.slug),
    fetchBrandsWithSlug(params.slug, searchParams),
    fetchCategoriesWithParams(params.slug, searchParams),
    countProductsWithSearchParams(params.slug, searchParams),
    fetchBrands(params.slug[0]),
    fetchCategories(params.slug[0]),
  ]);

  if (!variantsResult.success) throw new Error(variantsResult.error);
  if (!countResult.success) throw new Error(countResult.error);

  const variants = variantsResult.data;
  const productIds = variants.map((variant) => variant.productId);

  const optionsResults = await Promise.all([
    fetchColorsWithProductIds(productIds),
    fetchSizesWithProductIds(productIds),
  ]);
  const [colorsResult, sizesResult] = optionsResults;

  const filterData = {
    availableBrands: brandsResult.success ? brandsResult.data : [],
    availableCategories: categoriesResult.success ? categoriesResult.data : [],
    availableColors: colorsResult.success ? colorsResult.data : [],
    availableSizes: sizesResult.success ? sizesResult.data : [],
    initialBrands: allBrandsResult.success ? allBrandsResult.data : [],
    initialCategories: allCategoriesResult.success
      ? allCategoriesResult.data
      : [],
  };

  return <ProductsList filterData={filterData} count={countResult.data} />;
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
