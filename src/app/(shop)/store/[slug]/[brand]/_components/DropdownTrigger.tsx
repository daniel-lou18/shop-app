import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, CircleCheck } from "lucide-react";

type DropdownTriggerProps = { children: string } & (
  | {
      style: "normal";
      checkedValues?: never;
    }
  | {
      style: "check";
      checkedValues: string[];
    }
);

function DropdownTrigger({
  children,
  style,
  checkedValues,
}: DropdownTriggerProps) {
  return (
    <DropdownMenuTrigger asChild className="hover:bg-transparent">
      <Button variant="ghost" className="font-normal flex items-end gap-2">
        <span className="border-b border-solid border-transparent hover:border-gray-950 rounded-none">
          {children}
        </span>
        {style === "check" && (
          <span
            className={`text-primary ${
              checkedValues.length > 0 ? "" : "opacity-0"
            }`}
          >
            <CircleCheck
              size={18}
              strokeWidth={1.5}
              fill="currentColor"
              stroke="white"
            />
          </span>
        )}

        <span>
          <ChevronDown size={16} strokeWidth={1} className="checkbox-chevron" />
        </span>
      </Button>
    </DropdownMenuTrigger>
  );
}

export default DropdownTrigger;
