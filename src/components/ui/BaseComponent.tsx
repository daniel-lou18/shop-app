import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementType, ReactElement } from "react";

type BaseComponentProps<T extends ElementType> = {
  className?: string;
  tag?: T;
} & ComponentPropsWithoutRef<T>;

function BaseComponent<T extends ElementType = "div">({
  tag,
  className,
  children,
  ...props
}: BaseComponentProps<T>) {
  const Component = tag || "div";

  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}

export default BaseComponent;
