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
import { CircleCheck } from "lucide-react";

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
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0">
          <div className="relative py-2 px-4">
            <span>{hashMap[type]}</span>
            {checkedValues.length > 0 && (
              <span className="absolute top-0 right-0">
                <CircleCheck size={16} strokeWidth={1} />
              </span>
            )}
          </div>
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
