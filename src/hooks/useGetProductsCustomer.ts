import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parsePathParams } from "@/lib/parsers";
import { VariantsWithProduct } from "@/db/queries/variants";

export function useGetProductsCustomer(variants: VariantsWithProduct) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const params = parsePathParams(path);
  const [filteredVariants, setFilteredVariants] = useState<VariantsWithProduct>(
    [...variants]
  );
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
          if (resObject?.error) throw new Error(resObject.error);
          else throw new Error("Une erreur est survenue");
        }
        setFilteredVariants([...resObject]);
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

  return {
    filteredVariants,
    isLoading,
    setIsLoading,
    error,
    params,
    searchParams,
  };
}
