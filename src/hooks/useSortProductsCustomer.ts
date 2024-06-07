import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSortProductsCustomer(hashMap: { [key: string]: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<string>(searchParams.get("sort") || "");

  function handleSelect(type: string, value: string) {
    const newQueryString = new URLSearchParams(searchParams);
    newQueryString.set(type, hashMap[value]);
    setValue(value);
    router.push(`${pathname}?${newQueryString.toString()}`);
  }

  return { value, setValue, handleSelect };
}
