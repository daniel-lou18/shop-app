import { Skeleton } from "@/components/ui/skeleton";
import { Params } from "@/db/queries/products";
import React from "react";

function ProductsControlsSkeleton({ params }: { params: Params }) {
  return (
    <div className="flex my-6 justify-between">
      <div className="flex gap-4">
        <Skeleton className="w-[120px] h-[40px]" />
        <Skeleton className="w-[120px] h-[40px]" />
        {params.brand === "all" && params.slug.includes("all") && (
          <>
            <Skeleton className="w-[120px] h-[40px]" />
            <Skeleton className="w-[120px] h-[40px]" />
          </>
        )}
        {params.brand === "all" && !params.slug.includes("all") && (
          <Skeleton className="w-[120px] h-[40px]" />
        )}
        {params.brand !== "all" && <Skeleton className="w-[120px] h-[40px]" />}
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-[120px] h-[40px]" />
        <Skeleton className="w-[120px] h-[40px]" />
      </div>
    </div>
  );
}

export default ProductsControlsSkeleton;
