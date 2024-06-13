import { Sex } from "@prisma/client";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";
import ProductsData from "@/app/admin/products/_components/ProductsData";
import ProductsFilters from "@/app/admin/products/_components/ProductsFilters";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsFiltersContainer from "./_components/ProductsFiltersContainer";

export type ProductsTableProps = {
  searchParams?: { sex?: Sex; brand?: string; category?: string };
};

export default async function ProductsTable({
  searchParams,
}: ProductsTableProps) {
  return (
    <>
      {/* <Suspense
        fallback={
          <div className="flex gap-4">
            <Skeleton className="flex-1" />
            <Skeleton className="w-[100px] h-[40px]" />
            <Skeleton className="w-[100px] h-[40px]" />
          </div>
        }
        key={Object.values(searchParams || {}).join("")}
      > */}
      <ProductsFiltersContainer searchParams={searchParams} />
      {/* </Suspense> */}
      <Suspense
        fallback={<Loader />}
        key={Object.values(searchParams || {}).join("") + "a"}
      >
        <ProductsData searchParams={searchParams} />
      </Suspense>
    </>
  );
}
