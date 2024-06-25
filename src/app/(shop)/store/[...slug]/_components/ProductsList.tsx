"use client";

import { Params, TAKE } from "@/db/queries/products";
import ProductCard from "../../../products/_components/ProductCard";
import ProductsPagination from "./ProductsPagination";
import Loader from "@/components/ui/Loader";
import DropdownFilter from "./DropdownFilter";
import ProductsTotal from "./ProductsTotal";
import { Brand, Category } from "@prisma/client";
import { useGetProductsCustomer } from "@/hooks/useGetProductsCustomer";
import ProductFilters from "./ProductFilters";
import { Slug } from "@/types";
import { VariantsWithProduct } from "@/db/queries/variants";
import { toast } from "sonner";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

export type AvailableData = {
  availableBrands: Brand[];
  availableCategories: Category[];
  availableColors: string[];
  availableSizes: string[];
  initialBrands: Brand[];
  initialCategories: Category[];
};

type ProductsListProps = {
  count: number;
  params: Params;
} & { filterData: AvailableData };

function ProductsList({ filterData, count }: ProductsListProps) {
  const { filteredVariants, isLoading, setIsLoading, error, params } =
    useGetProductsCustomer();

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
      <ul
        className={`${
          isLoading ? "opacity-30" : ""
        } grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8`}
      >
        {filteredVariants === null &&
          Array.from({ length: TAKE }, (_, i) => <SkeletonCard key={i} />)}
        {filteredVariants &&
          filteredVariants.length > 0 &&
          filteredVariants.map((variant) => (
            <ProductCard
              type="variant"
              item={variant}
              key={variant.id}
              className="border border-solid border-gray-100 rounded-sm"
            />
          ))}
        {filteredVariants && filteredVariants.length === 0 && !isLoading && (
          <p>Aucun produit à afficher</p>
        )}
      </ul>
      <ProductsPagination
        take={TAKE}
        totalItems={count}
        setIsLoading={setIsLoading}
      />
    </>
  );
}

export default ProductsList;
