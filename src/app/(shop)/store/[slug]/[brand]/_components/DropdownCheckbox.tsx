"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { hashMap } from "@/helpers/helpers";
import { Brand, Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CheckboxItem from "./CheckboxItem";
import DropdownTrigger from "./DropdownTrigger";

type SelectFilterProps =
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
    };

function DropdownCheckbox({ type, data }: SelectFilterProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleCheck(type: string, value: string) {
    const newQueryString = new URLSearchParams(searchParams);
    newQueryString.append(type, value);
    setCheckedValues((prevState) => [...prevState, value]);
    router.push(`${pathname}?${newQueryString.toString()}`);
  }

  function handleUncheck(type: string, value: string) {
    const newQueryString = new URLSearchParams(searchParams);
    newQueryString.delete(type, value);
    setCheckedValues((prevState) =>
      prevState.filter((prevValue) => prevValue !== value)
    );
    router.push(`${pathname}?${newQueryString.toString()}`);
  }

  if (!data || data.length === 0) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownTrigger style="check" checkedValues={checkedValues}>
        {hashMap[type]}
      </DropdownTrigger>
      <DropdownMenuContent className="w-56">
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
