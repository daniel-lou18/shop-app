import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-square rounded-xl bg-gray-400" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full bg-gray-400" />
        <Skeleton className="h-4 w-56 bg-gray-400" />
      </div>
    </div>
  );
}
