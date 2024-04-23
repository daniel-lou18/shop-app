import { fetchProductsByCategory } from "@/db/queries/products";
import React from "react";
import ProductList from "../../_components/ProductList";

async function ProductsByCategory({ params }: { params: { slug: string } }) {
  const products = await fetchProductsByCategory(params.slug);
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default ProductsByCategory;
