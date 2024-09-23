import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementType, ReactElement } from "react";

type WrapperProps<T extends ElementType> = {
  className?: string;
  element?: T;
} & ComponentPropsWithoutRef<T>;

function Wrapper<T extends ElementType = "div">({
  element,
  className,
  children,
  ...props
}: WrapperProps<T>) {
  const Component = element || "div";

  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}

export default Wrapper;
