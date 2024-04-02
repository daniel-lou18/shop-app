import { Loader2 } from "lucide-react";

function ShopLoading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loader2 className="size-24 animate-spin" />
    </div>
  );
}

export default ShopLoading;
