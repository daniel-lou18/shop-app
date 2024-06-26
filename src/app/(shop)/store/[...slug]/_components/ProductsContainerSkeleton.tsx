import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function ProductsContainerSkeleton() {
  return (
    <>
      <div className="w-full flex justify-between my-6">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32 bg-gray-300 py-2" />
          <Skeleton className="h-10 w-32 bg-gray-300 py-2" />
          <Skeleton className="h-10 w-32 bg-gray-300 py-2" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-28 bg-gray-300 py-2" />
          <Skeleton className="h-10 w-28 bg-gray-300 py-2" />
        </div>
      </div>
      <ul
        className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8`}
      >
        {Array.from({ length: 16 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </ul>
    </>
  );
}

export default ProductsContainerSkeleton;
