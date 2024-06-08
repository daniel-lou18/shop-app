import { useState } from "react";

export function useSort<T>(initialData: T, fetchUrl: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [orderedData, setOrderedData] = useState<T>(initialData);

  async function handleSort(searchParams: string) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(fetchUrl + `?${searchParams}`);
      const data = await res.json();
      if (!res.ok) {
        if (data?.error) throw new Error(data.error);
        else throw new Error("Une erreur est survenue");
      }
      setOrderedData(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Une erreur est survenue");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, orderedData, handleSort };
}
