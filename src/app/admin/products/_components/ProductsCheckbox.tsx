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
import { AllBrands } from "@/db/queries/brands";
import { AllCategories } from "@/db/queries/categories";
import { ListFilter } from "lucide-react";

type ProductsCheckboxProps = {
  selectedValues: string[];
  handleCheckedChange: (value: string) => void;
  type: "brand" | "category";
  data: string[];
  allData: AllBrands | AllCategories;
};

function ProductsCheckbox({
  selectedValues,
  handleCheckedChange,
  type,
  data,
  allData,
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
        {allData.map((value) => (
          <DropdownMenuCheckboxItem
            key={value.name}
            checked={selectedValues.includes(value.name)}
            onCheckedChange={() => handleCheckedChange(value.name)}
            onSelect={(e) => e.preventDefault()}
            className={
              data.includes(value.name) ? "" : "text-muted-foreground/50"
            }
            disabled={!data.includes(value.name)}
          >
            {value.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductsCheckbox;
