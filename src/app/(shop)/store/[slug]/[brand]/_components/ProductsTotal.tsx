import React from "react";

function ProductsTotal({ total }: { total: number }) {
  return (
    <div className="px-4 py-2 text-sm h-full flex items-end border-b border-solid border-transparent">
      {total} modèles
    </div>
  );
}

export default ProductsTotal;
