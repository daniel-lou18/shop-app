import React from "react";

function ProductsTotal({ total }: { total: number }) {
  return (
    <div className="dropdown-container relative px-4 py-2 text-sm h-full flex md:hidden lg:flex items-end whitespace-nowrap">
      {total} modèles
    </div>
  );
}

export default ProductsTotal;
