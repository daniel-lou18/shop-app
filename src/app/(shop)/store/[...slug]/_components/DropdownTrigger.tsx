import Wrapper from "@/components/layout/Wrapper";
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
        <Wrapper element="span">{children}</Wrapper>
        {style === "check" && (
          <Wrapper
            element="span"
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
          </Wrapper>
        )}

        <Wrapper
          element="span"
          className={`${variant === "chevron" ? "inline" : "hidden"} md:inline`}
        >
          <ChevronDown size={16} strokeWidth={1} className="checkbox-chevron" />
        </Wrapper>
        <Wrapper
          element="span"
          className={`${variant === "chevron" ? "hidden" : "inline"} md:hidden`}
        >
          <ChevronRight size={16} strokeWidth={1} />
        </Wrapper>
      </Button>
    </DropdownMenuTrigger>
  );
}

export default DropdownTrigger;
