import { useState } from "react";
import { useQueryParams } from "./useQueryParams";

export function useSortProductsCustomer(hashMap: { [key: string]: string }) {
  const { path, searchParams, router } = useQueryParams();
  const [value, setValue] = useState<string>(searchParams.get("sort") || "");

  function handleSelect(type: string, value: string) {
    const newQueryString = new URLSearchParams(searchParams);
    newQueryString.set(type, hashMap[value]);
    setValue(value);
    router.push(`${path}?${newQueryString.toString()}`);
  }

  return { value, setValue, handleSelect };
}
