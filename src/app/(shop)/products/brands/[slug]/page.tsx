import { fetchProductsByBrand } from "@/db/queries/products";
import React from "react";
import ProductList from "../../_components/ProductList";
import PageHeading1 from "@/components/ui/PageHeading1";
import { splitCapitalizeUri } from "@/helpers/helpers";

async function ProductsByBrand({ params }: { params: { slug: string } }) {
  const products = await fetchProductsByBrand(params.slug);
  return (
    <>
      <PageHeading1>{splitCapitalizeUri(params.slug)}</PageHeading1>
      <ProductList products={products} />
    </>
  );
}

export default ProductsByBrand;
