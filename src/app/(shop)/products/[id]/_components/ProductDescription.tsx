import BaseComponent from "@/components/ui/BaseComponent";
import React from "react";

function ProductDescription({
  productDescription,
}: {
  productDescription: string | undefined;
}) {
  return (
    <BaseComponent tag="p" className="text-base text-gray-700">
      {productDescription}
    </BaseComponent>
  );
}

export default ProductDescription;
