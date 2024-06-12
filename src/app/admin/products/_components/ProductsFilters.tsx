import ProductsCheckboxes from "./ProductsCheckboxes";
import { ProductsTableProps } from "@/app/admin/products/page";
import { fetchCategoriesByBrands } from "@/db/queries/categories";
import { fetchBrandsByCategories } from "@/db/queries/brands";

async function ProductsFilters({ searchParams }: ProductsTableProps) {
  const sex =
    !searchParams?.sex || searchParams?.sex === "all"
      ? undefined
      : searchParams.sex;
  const brands = searchParams?.brand?.split(",") || undefined;
  const categories = searchParams?.category?.split(",") || undefined;

  const categoriesResult = await fetchCategoriesByBrands(sex, brands);
  const brandsResult = await fetchBrandsByCategories(sex, categories);
  if (!categoriesResult.success) throw new Error(categoriesResult.error);
  if (!brandsResult.success) throw new Error(brandsResult.error);

  return (
    <>
      <ProductsCheckboxes
        brands={Array.from(
          new Set(brandsResult.data.map((brand) => brand.name))
        )}
        categories={Array.from(
          new Set(categoriesResult.data.map((category) => category.name))
        )}
      />
    </>
  );
}

export default ProductsFilters;
