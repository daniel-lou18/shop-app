import Loader from "@/components/ui/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:px-0 md:pt-8 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-8 pt-8">
        <div className="col-span-1 md:sticky md:top-[104px] md:h-[600px] md:max-h-screen overflow-hidden">
          <Skeleton className="h-1/3 w-full object-cover object-top mb-2 hover:cursor-pointer rounded-sm bg-gray-200" />
          <Skeleton className="h-1/3 w-full object-cover object-top mb-2 hover:cursor-pointer rounded-sm bg-gray-200" />
          <Skeleton className="h-1/3 w-full object-cover object-top mb-2 hover:cursor-pointer rounded-sm bg-gray-200" />
        </div>
        <div className="col-span-4 md:sticky md:top-[104px] md:h-[600px] md:max-h-screen overflow-hidden rounded-sm">
          <Skeleton className="h-full w-full object-cover object-top bg-gray-200" />
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <Loader2 className="size-24 animate-spin" />
        </div>
      </div>
    </div>
  );
}

export default ProductsLoading;
