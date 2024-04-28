"use client";

import DropdownFilter from "@/components/ui/DropdownFilter";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand, Category } from "@prisma/client";
import ProductList from "../../products/_components/ProductList";
import { AllProductsWithVariants } from "@/db/queries/products";

type FilterProductListProps = {
  products: AllProductsWithVariants;
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
  products,
  availableBrands,
  availableCategories,
  availableColors,
  availableSizes,
}: FilterProductListProps) {
  const [filterValues, setFilterValues] = useState<string>("");
  const [filteredProducts, setFilteredProducts] =
    useState<AllProductsWithVariants>(products);

  useEffect(() => {
    async function updateData() {
      const result = await fetch(`/api/products?${filterValues}`);
      const data = await result.json();
      setFilteredProducts(data.products);
    }
    updateData();
  }, [filterValues]);

  const handleFilterChange = useCallback(
    (queryString: string) => {
      setFilterValues(queryString);
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
      <ProductList products={filteredProducts} />
    </>
  );
}

export default FilterProductList;
