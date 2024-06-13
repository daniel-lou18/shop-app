import { ProductsTableProps } from "@/app/admin/products/page";
import { fetchCategoriesByBrands } from "@/db/queries/categories";
import { fetchBrandsByCategories } from "@/db/queries/brands";

import ProductsSelectSex from "./ProductsSelectSex";
import ProductsCheckbox from "./ProductsCheckbox";
import TableActions from "../../../../components/admin/TableActions";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";
import ProductsFilters from "./ProductsFilters";

async function ProductsFiltersContainer({ searchParams }: ProductsTableProps) {
  const sex = !searchParams?.sex ? "femme" : searchParams.sex;
  const brands = searchParams?.brand?.split(",") || undefined;
  const categories = searchParams?.category?.split(",") || undefined;

  const categoriesResult = await fetchCategoriesByBrands(sex, brands);
  const brandsResult = await fetchBrandsByCategories(sex, categories);
  if (!categoriesResult.success) throw new Error(categoriesResult.error);
  if (!brandsResult.success) throw new Error(brandsResult.error);
  const brandsData = Array.from(
    new Set(brandsResult.data.map((brand) => brand.name))
  );
  const categoriesData = Array.from(
    new Set(categoriesResult.data.map((category) => category.name))
  );

  return (
    <>
      <div className="flex gap-4 flex-1 pb-4">
        <div
          className="flex items-center relative min-w-[300px] max-w-[500px] bg-white"
          id="table-search-container"
        ></div>
        <ProductsFilters
          brandsData={brandsData}
          categoriesData={categoriesData}
        />
      </div>
    </>
  );
}

export default ProductsFiltersContainer;
