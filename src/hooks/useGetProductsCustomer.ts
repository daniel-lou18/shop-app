import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AllProductsWithVariants } from "@/db/queries/products";
import { parsePathParams } from "@/lib/parsers";

export function useGetProductsCustomer(products: AllProductsWithVariants) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const params = parsePathParams(path);
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
          if (resObject?.error) throw new Error(resObject.error);
          else throw new Error("Une erreur est survenue");
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

  return { filteredProducts, isLoading, setIsLoading, error, params };
}
