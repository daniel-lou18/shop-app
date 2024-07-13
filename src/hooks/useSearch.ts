import { useEffect, useMemo, useState } from "react";
import { getProductsService } from "@/services/products-service";
import { ProductsWithVariants } from "@/db/queries/products";

export function useSearch() {
  const [error, setError] = useState<string>("");
  const [products, setProducts] = useState<ProductsWithVariants | []>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function getProducts() {
      setError("");
      try {
        const products = await getProductsService();
        setProducts(products);
      } catch (err: unknown) {
        err instanceof Error
          ? setError(err.message)
          : setError("Erreur inattendue");
      }
    }

    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) {
      return [];
    }

    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);
  }, [products, query]);

  return { error, filteredProducts, query, setQuery };
}
