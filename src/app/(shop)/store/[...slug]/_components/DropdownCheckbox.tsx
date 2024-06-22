"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { hashMap } from "@/helpers/helpers";
import { Brand, Category } from "@prisma/client";
import CheckboxItem from "./CheckboxItem";
import DropdownTrigger from "./DropdownTrigger";
import { Dispatch, SetStateAction } from "react";
import { useCheckProductsCustomer } from "@/hooks/useCheckProductsCustomer";

type SelectFilterProps = { setIsLoading: Dispatch<SetStateAction<boolean>> } & (
  | {
      type: "brand";
      data: Brand[];
      initialData: Brand[];
    }
  | {
      type: "category";
      data: Category[];
      initialData: Category[];
    }
  | {
      type: "color" | "size";
      data: string[];
      initialData: string[];
    }
);

function DropdownCheckbox({
  type,
  data,
  initialData,
  setIsLoading,
}: SelectFilterProps) {
  const { checkedValues, handleCheck, handleUncheck } =
    useCheckProductsCustomer(type, setIsLoading);
  if (!data || data.length === 0) return null;

  function isDisabled(type: string, value: Category | Brand | string) {
    if (type === "brand" || type === "category") {
      return !(data as Brand[] | Category[]).some(
        (item) => item.name === (value as Brand | Category).name
      );
    }
    return !(data as string[]).some((item) => item === value);
  }

  return (
    <div className="dropdown-container relative">
      <DropdownMenu modal={false}>
        <DropdownTrigger style="check" checkedValues={checkedValues}>
          {hashMap[type]}
        </DropdownTrigger>
        <DropdownMenuContent className="w-48 md:w-56">
          {initialData.map((value) => (
            <CheckboxItem
              key={
                type === "brand" || type === "category"
                  ? (value as Brand | Category).id
                  : (value as string)
              }
              type={type}
              checkedValues={checkedValues}
              onCheck={handleCheck}
              onUncheck={handleUncheck}
              disabled={isDisabled(type, value)}
            >
              {type === "brand" || type === "category"
                ? (value as Brand | Category).name
                : (value as string)}
            </CheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DropdownCheckbox;
