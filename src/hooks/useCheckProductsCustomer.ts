import { Dispatch, SetStateAction } from "react";
import { useQueryParams } from "./useQueryParams";

export function useCheckProductsCustomer(
  type: "color" | "category" | "brand" | "size",
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  const { searchParams, path, router } = useQueryParams();
  const checkedValues = searchParams.getAll(type);

  function handleCheckBox(
    type: string,
    value: string,
    action: "append" | "delete"
  ) {
    setIsLoading(true);
    const newQueryString = new URLSearchParams(searchParams);
    newQueryString.delete("page");
    action === "append"
      ? newQueryString.append(type, value)
      : newQueryString.delete(type, value);
    router.push(`${path}?${newQueryString.toString()}`);
  }

  function handleCheck(type: string, value: string) {
    handleCheckBox(type, value, "append");
  }

  function handleUncheck(type: string, value: string) {
    handleCheckBox(type, value, "delete");
  }

  return {
    checkedValues,
    handleCheck,
    handleUncheck,
  };
}
