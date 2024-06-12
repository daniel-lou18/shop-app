"use client";

import ProductsSelectSex from "../../../app/admin/products/_components/ProductsSelectSex";
import ProductsCheckbox from "../../../app/admin/products/_components/ProductsCheckbox";
import TableActions from "../../admin/TableActions";

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
