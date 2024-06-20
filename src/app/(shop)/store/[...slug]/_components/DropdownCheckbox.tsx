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
    }
  | {
      type: "category";
      data: Category[];
    }
  | {
      type: "color" | "size";
      data: string[];
    }
);

function DropdownCheckbox({ type, data, setIsLoading }: SelectFilterProps) {
  const { checkedValues, handleCheck, handleUncheck } =
    useCheckProductsCustomer(type, setIsLoading);

  if (!data || data.length === 0) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownTrigger style="check" checkedValues={checkedValues}>
        {hashMap[type]}
      </DropdownTrigger>
      <DropdownMenuContent
        className="w-48 md:w-56"
        side={window.innerWidth > 768 ? "bottom" : "right"}
      >
        {data.map((value) => (
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
          >
            {type === "brand" || type === "category"
              ? (value as Brand | Category).name
              : (value as string)}
          </CheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownCheckbox;
