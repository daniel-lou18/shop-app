import { fetchProductsByBrand } from "@/db/queries/products";
import React from "react";
import ProductList from "../../_components/ProductList";

async function ProductsByBrand({ params }: { params: { slug: string } }) {
  const products = await fetchProductsByBrand(params.slug);
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default ProductsByBrand;
