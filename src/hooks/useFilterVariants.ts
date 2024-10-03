import { useEffect, useState } from "react";
import variantService from "@/features/variants";
import { Variant } from "@/features/variants/Variant";
import { useQueryParams } from "./useQueryParams";

/* Custom hook to fetch variants based on params and search params
 * It calls the variantService that will call an API route,
 * which in turn will call a query function that gets the filtered variants from the database.
 * The actual filtering happens in the query function.
 */

export function useFilterVariants() {
  const { path, searchParams, params } = useQueryParams();
  const [filteredVariants, setFilteredVariants] = useState<Variant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError("");
        const data = await variantService.getMany(path, searchParams);
        setFilteredVariants(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erreur inattendue";
        setError(errorMessage);
        console.error("Erreur fetch :", errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [path, searchParams]);

  return {
    filteredVariants,
    isLoading,
    setIsLoading,
    error,
    params,
    searchParams,
  };
}
