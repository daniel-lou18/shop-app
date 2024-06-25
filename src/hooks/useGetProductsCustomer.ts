import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parsePathParams } from "@/lib/parsers";
import { VariantsWithProduct } from "@/db/queries/variants";

type FilteredData =
  | {
      error: string;
    }
  | VariantsWithProduct;

export function useGetProductsCustomer() {
  const searchParams = useSearchParams();
  const path = usePathname();
  const params = parsePathParams(path);
  const [filteredVariants, setFilteredVariants] =
    useState<VariantsWithProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`/api${path}?${searchParams.toString()}`);
        const data: FilteredData = await res.json();
        if (!res.ok) {
          throw new Error(
            (typeof data === "object" && "error" in data && data.error) ||
              "Une erreur est survenue lors de la récupération des produits"
          );
        }
        setFilteredVariants([...(data as VariantsWithProduct)]);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Une erreur inattendue est survenue");
        console.error("Erreur fetch :", err);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
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
