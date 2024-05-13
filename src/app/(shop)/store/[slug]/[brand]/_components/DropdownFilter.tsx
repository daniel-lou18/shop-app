"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import DropdownTrigger from "./DropdownTrigger";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const data = [
  "Recommandé",
  "Prix décroissant",
  "Prix croissant",
  "Nouveauté",
] as const;

type DataType = (typeof data)[number];

const hashMap = {
  Recommandé: "name-asc",
  "Prix décroissant": "price-desc",
  "Prix croissant": "price-asc",
  Nouveauté: "createdAt-desc",
};

function DropdownFilter() {
  const [value, setValue] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSelect(type: string, value: DataType) {
    const newQueryString = new URLSearchParams(searchParams);
    newQueryString.set(type, hashMap[value]);
    setValue(value);
    router.push(`${pathname}?${newQueryString.toString()}`);
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownTrigger style="normal" variant="chevron">
        Trier par
      </DropdownTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          {data.map((value, idx) => (
            <DropdownMenuRadioItem
              value={value}
              key={idx}
              onSelect={() => handleSelect("sort", value)}
            >
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownFilter;
