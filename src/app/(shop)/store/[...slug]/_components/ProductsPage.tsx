"use client";

import { TAKE } from "@/db/queries/products";
import ProductsPagination from "./ProductsPagination";
import Loader from "@/components/ui/Loader";
import DropdownFilter from "./DropdownFilter";
import ProductsTotal from "./ProductsTotal";
import { Brand, Category } from "@prisma/client";
import { useFilterVariants } from "@/hooks/useFilterVariants";
import ProductFilters from "./ProductFilters";
import { Slug } from "@/types";
import { toast } from "sonner";
import ProductsList from "./ProductsList";

export type AvailableData = {
  availableBrands: Brand[];
  availableCategories: Category[];
  availableColors: string[];
  availableSizes: string[];
  initialBrands: Brand[];
  initialCategories: Category[];
};

type ProductsPageProps = {
  count: number;
  filterData: AvailableData;
};

function ProductsPage({ filterData, count }: ProductsPageProps) {
  const { filteredVariants, isLoading, setIsLoading, error, params } =
    useFilterVariants();

  if (error) {
    toast.error("Une erreur est survenue lors de la récupération des produits");
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={`flex my-6 justify-between`}>
        <ProductFilters
          data={filterData}
          slug={params as Slug}
          setIsLoading={setIsLoading}
        />

        <div className="flex lg:gap-4">
          <ProductsTotal total={count} />
          <DropdownFilter />
        </div>
      </div>
      <ProductsList data={filteredVariants} isLoading={isLoading} />
      <ProductsPagination
        take={TAKE}
        totalItems={count}
        setIsLoading={setIsLoading}
      />
    </>
  );
}

export default ProductsPage;
