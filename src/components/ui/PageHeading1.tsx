import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type PageHeading1Props = {
  children: ReactNode;
  className: string;
};

function PageHeading1({ children, className }: PageHeading1Props) {
  return (
    <h1 className={cn("text-3xl font-bold mb-8", className)}>{children}</h1>
  );
}

export default PageHeading1;
