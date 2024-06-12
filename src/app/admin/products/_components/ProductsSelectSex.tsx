"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const sexValues = ["femme", "homme"];

type ProductsSelectSexProps = {
  title: string;
};
function ProductsSelectSex({ title }: ProductsSelectSexProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [selectedSex, setSelectedSex] = useState<string>(
    searchParams.get("sex") || "all"
  );

  useEffect(() => {
    const query = new URLSearchParams(searchParams);
    if (selectedSex) query.set("sex", selectedSex);
    router.push(`${pathName}?${query.toString()}`);
  }, [selectedSex, pathName, searchParams, router]);

  function handleValueChange(value: string) {
    setSelectedSex(value);
  }

  return (
    <Select name="status" onValueChange={handleValueChange} value={selectedSex}>
      <SelectTrigger
        id={`all-sexValues`}
        aria-label="Select status"
        className="w-auto"
      >
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes les collections</SelectItem>
        {sexValues.map((value) => (
          <SelectItem value={value} key={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProductsSelectSex;
