"use client";

import { AllProductsWithVariants, TAKE } from "@/db/queries/products";
import ProductCard from "../../../../products/_components/ProductCard";
import ProductsPagination from "./ProductsPagination";
import Loader from "@/components/ui/Loader";
import DropdownCheckbox from "@/app/(shop)/store/[slug]/[brand]/_components/DropdownCheckbox";
import DropdownFilter from "./DropdownFilter";
import ProductsTotal from "./ProductsTotal";
import { Brand, Category } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import DropdownTrigger from "./DropdownTrigger";
import { useGetProductsCustomer } from "@/hooks/useGetProductsCustomer";

export type AvailableData = {
  availableBrands: Brand[];
  availableCategories: Category[];
  availableColors: string[];
  availableSizes: string[];
  count: number;
};

type ProductsListProps = {
  products: AllProductsWithVariants;
} & AvailableData;

function ProductsList({
  products,
  availableBrands,
  availableCategories,
  availableColors,
  availableSizes,
  count,
}: ProductsListProps) {
  const { filteredProducts, isLoading, setIsLoading, error, params } =
    useGetProductsCustomer(products);

  if (!filteredProducts || filteredProducts.length === 0)
    throw new Error("Aucun produit à afficher");
  if (error) throw new Error(error);

  return (
    <>
      <div className={`flex my-6 justify-between`}>
        <div className="hidden md:flex lg:gap-4">
          {isLoading && <Loader />}
          <DropdownCheckbox
            type="color"
            data={availableColors}
            setIsLoading={setIsLoading}
          />
          <DropdownCheckbox
            type="size"
            data={availableSizes}
            setIsLoading={setIsLoading}
          />
          {params.brand === "all" && (
            <DropdownCheckbox
              type="brand"
              data={availableBrands}
              setIsLoading={setIsLoading}
            />
          )}
          {((params.brand === "all" && params.slug.includes("all")) ||
            params.brand !== "all") && (
            <DropdownCheckbox
              type="category"
              data={availableCategories}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownTrigger style="normal" variant="chevron">
              Filtres
            </DropdownTrigger>
            <DropdownMenuContent className={`w-48`}>
              <DropdownCheckbox
                type="color"
                data={availableColors}
                setIsLoading={setIsLoading}
              />
              <DropdownCheckbox
                type="size"
                data={availableSizes}
                setIsLoading={setIsLoading}
              />
              {params.brand === "all" && (
                <DropdownCheckbox
                  type="brand"
                  data={availableBrands}
                  setIsLoading={setIsLoading}
                />
              )}
              {((params.brand === "all" && params.slug.includes("all")) ||
                params.brand !== "all") && (
                <DropdownCheckbox
                  type="category"
                  data={availableCategories}
                  setIsLoading={setIsLoading}
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
        {filteredProducts.map((product) => (
          <ProductCard type="product" item={product} key={product.id} />
        ))}
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
