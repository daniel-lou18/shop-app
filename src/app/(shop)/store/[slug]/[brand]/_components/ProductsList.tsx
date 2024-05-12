"use client";

import { AllProductsWithVariants } from "@/db/queries/products";
import ProductCard from "../../../../products/_components/ProductCard";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductsList({ products }: { products: AllProductsWithVariants }) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const [filteredProducts, setFilteredProducts] =
    useState<AllProductsWithVariants>([...products]);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(`/api${path}?${searchParams.toString()}`);
        if (!res.ok)
          throw new Error(
            "Une erreur est survenue lors de la récupération des produits"
          );
        const products = await res.json();
        setFilteredProducts([...products]);
      } catch (err) {
        console.error(err);
      }
    }
    getProducts();
  }, [path, searchParams]);

  if (!filteredProducts || filteredProducts.length === 0)
    return <p>Aucun produit à afficher</p>;

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard type="product" item={product} key={product.id} />
      ))}
    </ul>
  );
}

export default ProductsList;
