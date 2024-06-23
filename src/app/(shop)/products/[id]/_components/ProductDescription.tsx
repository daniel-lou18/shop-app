import React from "react";

function ProductDescription({
  productDescription,
}: {
  productDescription: string | undefined;
}) {
  return <p className="text-base text-gray-700">{productDescription}</p>;
}

export default ProductDescription;
