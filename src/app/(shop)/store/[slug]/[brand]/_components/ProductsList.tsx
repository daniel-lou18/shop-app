"use client";

import { AllProductsWithVariants } from "@/db/queries/products";
import ProductCard from "../../../../products/_components/ProductCard";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

function ProductsList({ products }: { products: AllProductsWithVariants }) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const [filteredProducts, setFilteredProducts] =
    useState<AllProductsWithVariants>([...products]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`/api${path}?${searchParams.toString()}`);
        const resObject = await res.json();
        if (!res.ok) {
          if (resObject.error) throw new Error(resObject.error);
          throw new Error("Une erreur est survenue");
        }
        setFilteredProducts([...resObject]);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Une erreur est survenue");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, [path, searchParams]);

  if (!filteredProducts || filteredProducts.length === 0)
    return <p>Aucun produit à afficher</p>;

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard type="product" item={product} key={product.id} />
      ))}
    </ul>
  );
}

export default ProductsList;
