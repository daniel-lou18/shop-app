import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsWithVariants } from "@/db/queries/products";

type SelectFilterProps = {
  type: "color" | "size" | "brand" | "category";
  products: ProductsWithVariants;
};

const hashMap = { color: "Couleur", size: "Taille" };

async function SelectFilter({ type, products }: SelectFilterProps) {
  if (!products?.length) return null;
  const availableVariants = products.flatMap((product) => product.variants);
  const availableSizes = availableVariants.reduce((acc, variant) => {
    if (acc.includes(variant.size)) return acc;
    return [...acc, variant.size];
  }, [] as string[]);
  const availableColors = availableVariants.reduce((acc, variant) => {
    if (acc.includes(variant.color)) return acc;
    return [...acc, variant.color];
  }, [] as string[]);

  const availableBrandsOrCategories = products.map((product) => {
    if (type === "brand") {
      return product.brand.name;
    } else return product.category.name;
  });

  function getValues() {
    switch (type) {
      case "color":
        return availableColors;
      case "size":
        return availableSizes;
      case "brand":
        return availableBrandsOrCategories;
      case "category":
        return availableBrandsOrCategories;
    }
  }

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={type} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {getValues().map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectFilter;
