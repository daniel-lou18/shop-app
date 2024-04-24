import { fetchProductsByCategory } from "@/db/queries/products";
import React from "react";
import ProductList from "../../_components/ProductList";
import PageHeading1 from "@/components/ui/PageHeading1";
import { splitCapitalizeUri } from "@/helpers/helpers";

async function ProductsByCategory({ params }: { params: { slug: string } }) {
  const products = await fetchProductsByCategory(params.slug);
  return (
    <>
      <PageHeading1>{splitCapitalizeUri(params.slug)}</PageHeading1>
      <ProductList products={products} />
    </>
  );
}

export default ProductsByCategory;
