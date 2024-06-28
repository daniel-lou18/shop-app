import { SkeletonCard } from "@/components/skeletons/SkeletonCard";
import { Skeleton } from "./skeleton";
import React from "react";

function CarouselSkeleton() {
  return (
    <div className="px-4 sm:px-16 sm:py-8 w-full mt-4 md:mt-12">
      <div className="flex justify-between h-14 pb-4">
        <Skeleton className="h-full w-32 bg-gray-300 py-2" />
        <Skeleton className="h-full w-32 bg-gray-300 py-2" />
      </div>
      <div className="flex gap-4 pt-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export default CarouselSkeleton;
