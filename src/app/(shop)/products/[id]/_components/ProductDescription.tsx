import Wrapper from "@/components/layout/Wrapper";
import React from "react";

function ProductDescription({
  productDescription,
}: {
  productDescription: string | undefined;
}) {
  return (
    <Wrapper element="p" className="text-base text-gray-700">
      {productDescription}
    </Wrapper>
  );
}

export default ProductDescription;
