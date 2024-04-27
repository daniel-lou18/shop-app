"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { hashMap } from "@/helpers/helpers";
import { Brand, Category } from "@prisma/client";
import { useEffect, useState } from "react";

type SelectFilterProps = {
  onFilterChange: (
    type: "brand" | "category" | "color" | "size",
    value: string
  ) => void;
} & (
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

function DropdownFilter({ type, data, onFilterChange }: SelectFilterProps) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    onFilterChange(type, value);
  }, [value, onFilterChange, type]);

  if (!data || data.length === 0) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{hashMap[type]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          {(type === "brand" || type === "category") &&
            data.map((value) => (
              <DropdownMenuRadioItem value={value.id} key={value.id}>
                {value.name}
              </DropdownMenuRadioItem>
            ))}
          {(type === "color" || type === "size") &&
            data.map((value) => (
              <DropdownMenuRadioItem value={value} key={value}>
                {value}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownFilter;
