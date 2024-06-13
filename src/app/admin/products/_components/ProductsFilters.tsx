"use client";

import ProductsSelectSex, { SexType } from "./ProductsSelectSex";
import ProductsCheckbox from "./ProductsCheckbox";
import TableActions from "../../../../components/admin/TableActions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AllBrands } from "@/db/queries/brands";
import { AllCategories } from "@/db/queries/categories";

type ProductsFiltersProps = {
  brandsData: string[];
  categoriesData: string[];
  allBrands: AllBrands;
  allCategories: AllCategories;
};

function ProductsFilters({
  brandsData,
  categoriesData,
  allBrands,
  allCategories,
}: ProductsFiltersProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [selectedSex, setSelectedSex] = useState<SexType>(
    (searchParams.get("sex") as SexType) || "femme"
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brand")?.split(",") || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",") || []
  );

  useEffect(() => {
    const query = new URLSearchParams(searchParams);
    query.set("sex", selectedSex);
    if (selectedBrands.length > 0) {
      query.set("brand", selectedBrands.join(","));
    } else {
      query.delete("brand");
    }
    if (selectedCategories.length > 0) {
      query.set("category", selectedCategories.join(","));
    } else {
      query.delete("category");
    }
    router.push(`${pathName}?${query.toString()}`);
  }, [
    selectedSex,
    selectedBrands,
    selectedCategories,
    pathName,
    searchParams,
    router,
  ]);

  function handleSexChange(value: SexType) {
    setSelectedSex(value);
    setSelectedBrands([]);
    setSelectedCategories([]);
  }

  function handleCheckedChange(
    value: string,
    setStateAction: Dispatch<SetStateAction<string[]>>
  ) {
    setStateAction((prevState) =>
      prevState.includes(value)
        ? prevState.filter((prev) => value !== prev)
        : [...prevState, value]
    );
  }

  return (
    <>
      <ProductsSelectSex
        title="Collection"
        selectedSex={selectedSex}
        handleValueChange={handleSexChange}
      />
      <ProductsCheckbox
        selectedValues={selectedBrands}
        handleCheckedChange={(value) =>
          handleCheckedChange(value, setSelectedBrands)
        }
        data={brandsData}
        allData={allBrands.filter((brand) => brand.sex === selectedSex)}
        type="brand"
      />
      <ProductsCheckbox
        selectedValues={selectedCategories}
        handleCheckedChange={(value) =>
          handleCheckedChange(value, setSelectedCategories)
        }
        data={categoriesData}
        allData={allCategories.filter(
          (category) => category.sex === selectedSex
        )}
        type="category"
      />
      <TableActions buttonText={`Ajouter produit`} />
    </>
  );
}

export default ProductsFilters;
