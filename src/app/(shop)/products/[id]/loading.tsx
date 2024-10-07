import { Skeleton } from "@/components/skeletons/skeleton";
import Loader from "@/components/ui/Loader";

function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:pt-8 md:pb-16">
      <Skeleton className="h-8 w-[80%] md:w-[30%] object-cover object-top hover:cursor-pointer rounded-sm bg-gray-200" />
      <div className="grid grid-cols-1 md:grid-cols-8 md:gap-8 pt-6">
        <div className="col-span-1 sticky top-[104px] h-[600px] max-h-screen overflow-hidden">
          <Skeleton className="h-2/3 md:h-1/3 w-full object-cover object-top mb-2 hover:cursor-pointer rounded-sm bg-gray-200" />
          <Skeleton className="h-2/3 md:h-1/3 w-full object-cover object-top mb-2 hover:cursor-pointer rounded-sm bg-gray-200" />
          <Skeleton className="h-2/3 md:h-1/3 w-full object-cover object-top mb-2 hover:cursor-pointer rounded-sm bg-gray-200" />
        </div>
        <div className="col-span-4 md:sticky md:top-[104px] md:h-[600px] md:max-h-screen overflow-hidden rounded-sm">
          <Skeleton className="h-full w-full object-cover object-top bg-gray-200" />
        </div>
        <Loader />
      </div>
    </div>
  );
}

export default ProductsLoading;
