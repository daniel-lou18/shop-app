"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

type ProductsCheckboxProps = {
  selectedValues: string[];
  handleCheckedChange: (value: string) => void;
  type: "brand" | "category";
  data: string[];
};

function ProductsCheckbox({
  selectedValues,
  handleCheckedChange,
  type,
  data,
}: ProductsCheckboxProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {type === "brand" ? "Marque" : "Catégorie"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Faites votre sélection</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.map((value) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedValues.includes(value)}
            onCheckedChange={() => handleCheckedChange(value)}
            onSelect={(e) => e.preventDefault()}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductsCheckbox;
