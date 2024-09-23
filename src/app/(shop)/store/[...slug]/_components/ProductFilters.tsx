import DropdownCheckbox from "./DropdownCheckbox";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import DropdownTrigger from "./DropdownTrigger";
import { Dispatch, SetStateAction } from "react";
import { Slug } from "@/types";
import { AvailableData } from "./ProductsPage";
import Wrapper from "@/components/layout/Wrapper";

type ProductFiltersProps = {
  data: AvailableData;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  slug: Slug;
};

function ProductFilters({ data, setIsLoading, slug }: ProductFiltersProps) {
  const {
    availableBrands,
    availableCategories,
    availableColors,
    availableSizes,
    initialBrands,
    initialCategories,
  } = data;
  if (
    !availableBrands ||
    !availableCategories ||
    !availableColors ||
    !availableSizes ||
    !initialBrands ||
    !initialCategories
  )
    return null;
  const [_, category, brand] = slug;
  const showCategoryFilter = category === "brandstore" || (!category && !brand);
  const showBrandFilter = !brand;
  return (
    <>
      <Wrapper className="hidden md:flex lg:gap-4">
        <DropdownCheckbox
          type="color"
          data={availableColors}
          initialData={availableColors}
          setIsLoading={setIsLoading}
        />
        <DropdownCheckbox
          type="size"
          data={availableSizes}
          initialData={availableSizes}
          setIsLoading={setIsLoading}
        />
        {showBrandFilter && (
          <DropdownCheckbox
            type="brand"
            data={availableBrands}
            initialData={initialBrands}
            setIsLoading={setIsLoading}
          />
        )}
        {showCategoryFilter && (
          <DropdownCheckbox
            type="category"
            data={availableCategories}
            initialData={initialCategories}
            setIsLoading={setIsLoading}
          />
        )}
      </Wrapper>
      <Wrapper className="block md:hidden">
        <DropdownMenu>
          <DropdownTrigger style="normal" variant="chevron">
            Filtres
          </DropdownTrigger>
          <DropdownMenuContent className={`w-48`}>
            <DropdownCheckbox
              type="color"
              data={availableColors}
              initialData={availableColors}
              setIsLoading={setIsLoading}
            />
            <DropdownCheckbox
              type="size"
              data={availableSizes}
              initialData={availableSizes}
              setIsLoading={setIsLoading}
            />
            {showBrandFilter && (
              <DropdownCheckbox
                type="brand"
                data={availableBrands}
                initialData={initialBrands}
                setIsLoading={setIsLoading}
              />
            )}
            {showCategoryFilter && (
              <DropdownCheckbox
                type="category"
                data={availableCategories}
                initialData={initialCategories}
                setIsLoading={setIsLoading}
              />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </Wrapper>
    </>
  );
}

export default ProductFilters;
