"use client";

import { ProductsWithVariants, Params, TAKE } from "@/db/queries/products";
import ProductCard from "../../../products/_components/ProductCard";
import ProductsPagination from "./ProductsPagination";
import Loader from "@/components/ui/Loader";
import DropdownFilter from "./DropdownFilter";
import ProductsTotal from "./ProductsTotal";
import { Brand, Category } from "@prisma/client";
import { useGetProductsCustomer } from "@/hooks/useGetProductsCustomer";
import ProductFilters from "./ProductFilters";
import { Slug } from "@/types";

export type AvailableData = {
  availableBrands: Brand[];
  availableCategories: Category[];
  availableColors: string[];
  availableSizes: string[];
  initialBrands: Brand[];
  initialCategories: Category[];
};

type ProductsListProps = {
  products: ProductsWithVariants;
  count: number;
  params: Params;
} & { filterData: AvailableData };

function ProductsList({ products, filterData, count }: ProductsListProps) {
  const { filteredProducts, isLoading, setIsLoading, error, params } =
    useGetProductsCustomer(products);
  if (error) throw new Error(error);

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
        } grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard type="product" item={product} key={product.id} />
          ))
        ) : (
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
