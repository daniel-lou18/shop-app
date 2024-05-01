"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { hashMap } from "@/helpers/helpers";
import { Brand, Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CheckboxItem from "./CheckboxItem";
import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";

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
      <DropdownMenuTrigger asChild className="hover:bg-transparent">
        <Button variant="ghost" className="font-normal flex items-end gap-2">
          <span className="border-b border-solid border-transparent hover:border-gray-950 rounded-none">
            {hashMap[type]}
          </span>

          <span
            className={`text-primary ${
              checkedValues.length > 0 ? "" : "opacity-0"
            }`}
          >
            <CircleCheck
              size={18}
              strokeWidth={1.5}
              fill="currentColor"
              stroke="white"
            />
          </span>

          <span>
            <ChevronDown
              size={16}
              strokeWidth={1}
              className="checkbox-chevron"
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {(type === "brand" || type === "category") &&
          data.map((value) => (
            <CheckboxItem
              key={value.id}
              type={type}
              checkedValues={checkedValues}
              onCheck={handleCheck}
              onUncheck={handleUncheck}
            >
              {value.name}
            </CheckboxItem>
          ))}
        {(type === "color" || type === "size") &&
          data.map((value) => (
            <CheckboxItem
              key={value}
              type={type}
              checkedValues={checkedValues}
              onCheck={handleCheck}
              onUncheck={handleUncheck}
            >
              {value}
            </CheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownCheckbox;
