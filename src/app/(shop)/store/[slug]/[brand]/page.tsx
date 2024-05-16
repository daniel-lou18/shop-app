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
import { formatParamsToString } from "@/lib/parsers";
import ProductsList from "@/app/(shop)/store/[slug]/[brand]/_components/ProductsList";
import { fetchBrands } from "@/db/queries/brands";
import { fetchCategories } from "@/db/queries/categories";

export type StoreProps = {
  params: Params;
  searchParams: SearchParams;
};

export default async function ProductsBySlug({
  params,
  searchParams,
}: StoreProps) {
  const [productsResult, brandsResult, categoriesResult, countResult] =
    await Promise.all([
      fetchProductsWithParams(params),
      fetchBrandsWithSlug(params.slug, searchParams),
      fetchCategoriesWithParams(params, searchParams),
      countProductsWithSearchParams(params, searchParams),
    ]);

  if (!productsResult.success) throw new Error(productsResult.error);
  if (!brandsResult.success) throw new Error(brandsResult.error);
  if (!categoriesResult.success) throw new Error(categoriesResult.error);
  if (!countResult.success) throw new Error(countResult.error);

  const products = productsResult.data;
  const productIds = products.map((product) => product.id);

  const variantsResults = await Promise.all([
    fetchColorsWithProductIds(productIds),
    fetchSizesWithProductIds(productIds),
  ]);
  const [colorsResult, sizesResult] = variantsResults;

  if (!colorsResult.success) throw new Error(colorsResult.error);
  if (!sizesResult.success) throw new Error(sizesResult.error);

  return (
    <div className="px-4 md:px-0 py-6 md:py-0">
      <PageHeading1>{formatParamsToString(params)}</PageHeading1>
      <ProductsList
        products={productsResult.data}
        availableBrands={brandsResult.data}
        availableCategories={categoriesResult.data}
        availableColors={colorsResult.data}
        availableSizes={sizesResult.data}
        count={countResult.data}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const [brandsResult, categoriesResult] = await Promise.all([
    fetchBrands(),
    fetchCategories(),
  ]);
  if (!brandsResult.success) throw new Error(brandsResult.error);
  if (!categoriesResult.success) throw new Error(categoriesResult.error);

  const brandsParams = brandsResult.data.map((brand) => ({
    slug: brand.sex,
    brand: brand.name,
  }));
  const categoriesParams = categoriesResult.data.map((category) => ({
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
