import BaseComponent from "@/components/ui/BaseComponent";
import React from "react";

function ProductsTotal({ total }: { total: number }) {
  return (
    <BaseComponent className="dropdown-container relative px-4 py-2 text-sm h-full flex md:hidden lg:flex items-end whitespace-nowrap">
      {total} modèles
    </BaseComponent>
  );
}

export default ProductsTotal;
