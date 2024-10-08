"use client";
import { useState } from "react";
import { DropdownMenuCheckboxItem } from "../../../../../components/ui/dropdown-menu";
import BaseComponent from "@/components/ui/BaseComponent";

type FilterTypes = "brand" | "category" | "color" | "size";

type CheckboxItemProps = {
  children: string;
  type: FilterTypes;
  checkedValues: string[];
  onCheck: (type: FilterTypes, value: string) => void;
  onUncheck: (type: FilterTypes, value: string) => void;
  disabled?: boolean;
};

function CheckboxItem({
  children,
  type,
  checkedValues,
  onCheck,
  onUncheck,
  disabled,
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
      disabled={disabled}
    >
      <BaseComponent tag="span" className="ml-2">
        {children}
      </BaseComponent>
    </DropdownMenuCheckboxItem>
  );
}

export default CheckboxItem;
