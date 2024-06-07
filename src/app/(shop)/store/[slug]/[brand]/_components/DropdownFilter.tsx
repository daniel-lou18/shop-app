"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import DropdownTrigger from "./DropdownTrigger";
import { useSortProductsCustomer } from "@/hooks/useSortProductsCustomer";

const data = [
  "Recommandé",
  "Prix décroissant",
  "Prix croissant",
  "Nouveauté",
] as const;

const hashMap = {
  Recommandé: "name-asc",
  "Prix décroissant": "price-desc",
  "Prix croissant": "price-asc",
  Nouveauté: "createdAt-desc",
};

function DropdownFilter() {
  const { value, setValue, handleSelect } = useSortProductsCustomer(hashMap);

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
