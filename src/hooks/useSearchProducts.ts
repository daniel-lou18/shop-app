import { useEffect, useState } from "react";
import productService from "@/features/products";
import { Product } from "@/features/products/Product";

export function useSearchProducts() {
  const [error, setError] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (!query) {
      return setProducts([]);
    }

    async function fetchProducts() {
      setError("");
      try {
        const products = await productService.getMany(query);
        setProducts(products);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Erreur inattendue";
        setError(errorMessage);
        console.error("Error searching products:", errorMessage);
      }
    }

    fetchProducts();
  }, [query]);

  return { error, products, query, setQuery };
}
