import { Skeleton } from "./skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-2 md:space-y-3">
      <Skeleton className="aspect-square rounded-xl bg-gray-300" />
      <div className="space-y-2 md:space-y-4">
        <Skeleton className="h-4 w-[50%] bg-gray-300" />
        <Skeleton className="h-4 w-[90%] bg-gray-300" />
        <Skeleton className="h-4 w-[30%] bg-gray-300" />
      </div>
    </div>
  );
}
