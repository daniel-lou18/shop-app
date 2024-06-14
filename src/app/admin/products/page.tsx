import { Sex } from "@prisma/client";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";
import ProductsData from "@/app/admin/products/_components/ProductsData";
import ProductsFiltersContainer from "./_components/ProductsFiltersContainer";
import { fetchCategories } from "@/db/queries/categories";
import { fetchBrands } from "@/db/queries/brands";

export type ProductsTableProps = {
  searchParams?: { sex?: Sex; brand?: string; category?: string };
};

export default async function ProductsTable({
  searchParams,
}: ProductsTableProps) {
  const allBrands = await fetchBrands();
  const allCategories = await fetchCategories();
  return (
    <>
      <ProductsFiltersContainer
        searchParams={searchParams}
        allBrands={allBrands.success ? allBrands.data : []}
        allCategories={allCategories.success ? allCategories.data : []}
      />
      <Suspense
        fallback={<Loader />}
        key={Object.values(searchParams || {}).join("") + "a"}
      >
        <ProductsData searchParams={searchParams} />
      </Suspense>
    </>
  );
}

{
  /* <Suspense
        fallback={
          <div className="flex gap-4">
            <Skeleton className="flex-1" />
            <Skeleton className="w-[100px] h-[40px]" />
            <Skeleton className="w-[100px] h-[40px]" />
          </div>
        }
        key={Object.values(searchParams || {}).join("")}
      > */
}
{
  /* </Suspense> */
}
