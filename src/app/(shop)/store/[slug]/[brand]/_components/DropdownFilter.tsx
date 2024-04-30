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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

function DropdownFilter({ type, data }: SelectFilterProps) {
  const [value, setValue] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const newQueryString = new URLSearchParams(searchParams);
    value && newQueryString.set(type, value);
    router.push(`${pathname}?${newQueryString.toString()}`);
  }, [searchParams, type, value, router, pathname]);

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
              <DropdownMenuRadioItem value={value.name} key={value.id}>
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
