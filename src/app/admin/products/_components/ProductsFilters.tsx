"use client";

import ProductsSelectSex, { SexType } from "./ProductsSelectSex";
import ProductsCheckbox from "./ProductsCheckbox";
import TableActions from "../../../../components/admin/TableActions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProductsFiltersProps = { brandsData: string[]; categoriesData: string[] };

function ProductsFilters({ brandsData, categoriesData }: ProductsFiltersProps) {
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
  }, [selectedBrands, selectedCategories, pathName, searchParams, router]);

  function handleSexChange(value: SexType) {
    setSelectedSex(value);
    setSelectedBrands([]);
    setSelectedCategories([]);
    const query = new URLSearchParams();
    query.set("sex", value);
    router.push(`${pathName}?${query.toString()}`);
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

  // function handleCheckedChange(
  //   value: string,
  //   setStateAction: Dispatch<SetStateAction<string[]>>,
  //   type: "brand" | "category"
  // ) {
  //   const query = new URLSearchParams(searchParams);
  //   let updatedString: string | undefined;
  //   setStateAction((prevState) => {
  //     if (prevState.includes(value)) {
  //       updatedString = query
  //         .get(type)
  //         ?.split(",")
  //         .filter((prev) => prev !== value)
  //         .join(",");
  //       query.set(type, updatedString || "");
  //       router.push(`${pathName}?${query.toString()}`);
  //       return prevState.filter((prev) => value !== prev);
  //     }
  //     const updatedArray = query.get(type)?.split(",") || [];
  //     updatedArray.push(value);
  //     query.set(type, updatedArray.join(",") || "");
  //     router.push(`${pathName}?${query.toString()}`);
  //     return [...prevState, value];
  //   });
  // }
  console.log(selectedCategories);

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
        type="brand"
      />
      <ProductsCheckbox
        selectedValues={selectedCategories}
        handleCheckedChange={(value) =>
          handleCheckedChange(value, setSelectedCategories)
        }
        data={categoriesData}
        type="category"
      />
      <TableActions buttonText={`Ajouter produit`} />
    </>
  );
}

export default ProductsFilters;
