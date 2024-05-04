"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import DropdownTrigger from "./DropdownTrigger";

const data = ["Recommandé", "Prix décroissant", "Prix croissant", "Nouveauté"];

function DropdownFilter() {
  const [value, setValue] = useState<string>("");

  return (
    <DropdownMenu modal={false}>
      <DropdownTrigger style="normal">Trier par</DropdownTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          {data.map((value, idx) => (
            <DropdownMenuRadioItem value={value} key={idx}>
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownFilter;
