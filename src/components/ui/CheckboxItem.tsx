"use client";
import { useState } from "react";
import { DropdownMenuCheckboxItem } from "./dropdown-menu";

type FilterTypes = "brand" | "category" | "color" | "size";

type CheckboxItemProps = {
  children: string;
  type: FilterTypes;
  checkedValues: string[];
  onCheck: (type: FilterTypes, value: string) => void;
  onUncheck: (type: FilterTypes, value: string) => void;
};

function CheckboxItem({
  children,
  type,
  checkedValues,
  onCheck,
  onUncheck,
}: CheckboxItemProps) {
  const [checked, setChecked] = useState<boolean>(
    checkedValues.includes(children)
  );

  function handleSelect(e: Event) {
    e.preventDefault();
    if (!checked) {
      onCheck(type, children);
    } else {
      onUncheck(type, children);
    }
  }

  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      onCheckedChange={setChecked}
      onSelect={handleSelect}
    >
      {children}
    </DropdownMenuCheckboxItem>
  );
}

export default CheckboxItem;
