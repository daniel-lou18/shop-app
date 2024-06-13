"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
const sexValues = ["femme", "homme"] as const;
export type SexType = (typeof sexValues)[number];

type ProductsSelectSexProps = {
  title: string;
  selectedSex: SexType;
  handleValueChange: (value: SexType) => void;
};
function ProductsSelectSex({
  title,
  selectedSex,
  handleValueChange,
}: ProductsSelectSexProps) {
  return (
    <Select name="status" onValueChange={handleValueChange} value={selectedSex}>
      <SelectTrigger
        id={`all-sexValues`}
        aria-label="Select status"
        className="w-auto min-w-[160px]"
      >
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {sexValues.map((value) => (
          <SelectItem value={value} key={value}>
            Collection {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProductsSelectSex;
