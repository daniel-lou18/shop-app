"use client";

import DropdownFilter from "@/components/ui/DropdownFilter";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand, Category } from "@prisma/client";

type FilterProductListProps = {
  availableBrands: Brand[];
  availableCategories: Category[];
  availableColors: string[];
  availableSizes: string[];
};

type FilterValues = {
  color?: string;
  size?: string;
  brand?: string;
  category?: string;
};

const initialState = {
  color: "all",
  size: "all",
  brand: "all",
  category: "all",
};

function FilterProductList({
  availableBrands,
  availableCategories,
  availableColors,
  availableSizes,
}: FilterProductListProps) {
  const [filterValues, setFilterValues] = useState<FilterValues | {}>(
    initialState
  );
  const router = useRouter();

  const queryString = Object.entries(filterValues)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    router.push(`/store?${queryString}`);
  }, [router, queryString]);

  const handleFilterChange = useCallback(
    (type: "color" | "size" | "brand" | "category", value: string) => {
      setFilterValues((prevState) => {
        return { ...prevState, [type]: value };
      });
    },
    [setFilterValues]
  );

  return (
    <>
      <div className="flex gap-4 my-6">
        <DropdownFilter
          type="color"
          onFilterChange={handleFilterChange}
          data={availableColors}
        />
        <DropdownFilter
          type="size"
          onFilterChange={handleFilterChange}
          data={availableSizes}
        />
        <DropdownFilter
          type="brand"
          onFilterChange={handleFilterChange}
          data={availableBrands}
        />
        <DropdownFilter
          type="category"
          onFilterChange={handleFilterChange}
          data={availableCategories}
        />
      </div>
    </>
  );
}

export default FilterProductList;
