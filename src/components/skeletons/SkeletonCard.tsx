import { Skeleton } from "./skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-square rounded-xl bg-gray-300" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full bg-gray-300" />
        <Skeleton className="h-4 w-56 bg-gray-300" />
      </div>
    </div>
  );
}
