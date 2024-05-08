import DropdownCheckbox from "@/app/(shop)/store/[slug]/[brand]/_components/DropdownCheckbox";
import DropdownFilter from "./DropdownFilter";
import ProductsTotal from "./ProductsTotal";
import {
  fetchBrandsWithSlug,
  fetchCategoriesWithParams,
  fetchColorsWithProductIds,
  fetchSizesWithProductIds,
} from "@/db/queries/products";
import { StoreProps } from "../page";

type ProductsControlsProps = StoreProps & {
  productIds: string[];
  count: number;
};
async function ProductsControls({
  params,
  searchParams,
  productIds,
  count,
}: ProductsControlsProps) {
  const availableBrands = await fetchBrandsWithSlug(params.slug, searchParams);
  const availableCategories = await fetchCategoriesWithParams(
    params,
    searchParams
  );
  const availableColors = await fetchColorsWithProductIds(productIds);
  const availableSizes = await fetchSizesWithProductIds(productIds);

  return (
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
  );
}

export default ProductsControls;
