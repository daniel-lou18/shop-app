import Wrapper from "@/components/layout/Wrapper";
import React from "react";

function ProductsTotal({ total }: { total: number }) {
  return (
    <Wrapper className="dropdown-container relative px-4 py-2 text-sm h-full flex md:hidden lg:flex items-end whitespace-nowrap">
      {total} modèles
    </Wrapper>
  );
}

export default ProductsTotal;
