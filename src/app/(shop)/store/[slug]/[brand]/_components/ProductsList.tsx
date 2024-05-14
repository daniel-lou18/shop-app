"use client";

import { AllProductsWithVariants, TAKE } from "@/db/queries/products";
import ProductCard from "../../../../products/_components/ProductCard";
import ProductsPagination from "./ProductsPagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import DropdownCheckbox from "@/app/(shop)/store/[slug]/[brand]/_components/DropdownCheckbox";
import DropdownFilter from "./DropdownFilter";
import ProductsTotal from "./ProductsTotal";
import { Brand, Category } from "@prisma/client";
import { parsePathParams } from "@/helpers/helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import DropdownTrigger from "./DropdownTrigger";

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
  const searchParams = useSearchParams();
  const path = usePathname();
  const params = parsePathParams(path);
  const [filteredProducts, setFilteredProducts] =
    useState<AllProductsWithVariants>([...products]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`/api${path}?${searchParams.toString()}`);
        const resObject = await res.json();
        if (!res.ok) {
          if (resObject.error) throw new Error(resObject.error);
          throw new Error("Une erreur est survenue");
        }
        setFilteredProducts([...resObject]);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Une erreur est survenue");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, [path, searchParams]);

  if (!filteredProducts || filteredProducts.length === 0)
    return <p>Aucun produit à afficher</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={`${isLoading ? "opacity-30" : ""} flex my-6 justify-between`}
      >
        <div className="hidden md:flex lg:gap-4">
          <DropdownCheckbox
            type="color"
            data={availableColors}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <DropdownCheckbox
            type="size"
            data={availableSizes}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          {params.brand === "all" && (
            <DropdownCheckbox
              type="brand"
              data={availableBrands}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {((params.brand === "all" && params.slug.includes("all")) ||
            params.brand !== "all") && (
            <DropdownCheckbox
              type="category"
              data={availableCategories}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownTrigger style="normal" variant="chevron">
              Filters
            </DropdownTrigger>
            <DropdownMenuContent
              className={`${isLoading ? "opacity-30" : ""} w-48`}
            >
              <DropdownCheckbox
                type="color"
                data={availableColors}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <DropdownCheckbox
                type="size"
                data={availableSizes}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              {params.brand === "all" && (
                <DropdownCheckbox
                  type="brand"
                  data={availableBrands}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {((params.brand === "all" && params.slug.includes("all")) ||
                params.brand !== "all") && (
                <DropdownCheckbox
                  type="category"
                  data={availableCategories}
                  isLoading={isLoading}
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
