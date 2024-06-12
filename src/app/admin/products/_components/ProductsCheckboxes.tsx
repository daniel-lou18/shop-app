"use client";

import ProductsSelectSex from "./ProductsSelectSex";
import ProductsCheckbox from "./ProductsCheckbox";
import TableActions from "../../../../components/admin/TableActions";

function ProductsCheckboxes({
  brands,
  categories,
}: {
  brands: string[];
  categories: string[];
}) {
  return (
    <div className="flex gap-4 flex-1 pb-4">
      <div
        className="flex items-center relative"
        id="table-search-container"
      ></div>
      <ProductsSelectSex title="Collection" />
      <ProductsCheckbox data={brands} type="brand" />
      <ProductsCheckbox data={categories} type="category" />
      <TableActions buttonText={`Ajouter produit`} />
    </div>
  );
}

export default ProductsCheckboxes;
