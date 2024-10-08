import BaseComponent from "@/components/ui/BaseComponent";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, CircleCheck } from "lucide-react";

type DropdownTriggerProps = {
  children: string;
  variant?: "chevron" | "arrow";
} & (
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
  variant,
}: DropdownTriggerProps) {
  return (
    <DropdownMenuTrigger asChild className="hover:bg-transparent">
      <Button
        variant="link"
        className="font-normal w-full flex gap-2 justify-between md:justify-center items-end"
      >
        <BaseComponent tag="span">{children}</BaseComponent>
        {style === "check" && (
          <BaseComponent
            tag="span"
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
          </BaseComponent>
        )}

        <BaseComponent
          tag="span"
          className={`${variant === "chevron" ? "inline" : "hidden"} md:inline`}
        >
          <ChevronDown size={16} strokeWidth={1} className="checkbox-chevron" />
        </BaseComponent>
        <BaseComponent
          tag="span"
          className={`${variant === "chevron" ? "hidden" : "inline"} md:hidden`}
        >
          <ChevronRight size={16} strokeWidth={1} />
        </BaseComponent>
      </Button>
    </DropdownMenuTrigger>
  );
}

export default DropdownTrigger;
