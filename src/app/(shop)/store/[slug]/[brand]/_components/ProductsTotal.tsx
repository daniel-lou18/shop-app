import React from "react";

function ProductsTotal({ total }: { total: number }) {
  return (
    <div className="px-4 py-2 text-sm h-full flex md:hidden lg:flex items-end border-b border-solid border-transparent whitespace-nowrap">
      {total} modèles
    </div>
  );
}

export default ProductsTotal;
