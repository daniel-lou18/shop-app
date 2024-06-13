"use client";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
        className="w-auto"
      >
        <SelectValue placeholder={title} className="mr-2" />
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

// const searchParams = useSearchParams();
// const pathName = usePathname();
// const router = useRouter();
// const [selectedSex, setSelectedSex] = useState<string>(
//   searchParams.get("sex") || "femme"
// );

// useEffect(() => {
//   const query = new URLSearchParams(searchParams);
//   if (selectedSex) {
//     query.delete("category");
//     query.delete("brand");
//     query.set("sex", selectedSex);
//   }
//   router.push(`${pathName}?${query.toString()}`);
// }, [selectedSex, pathName, searchParams, router]);
