"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function ButtonSubmit({
  children,
  className,
  size = "sm",
}: {
  children: ReactNode;
  size?: "sm" | "lg";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={size}
      className={cn("inline-flex items-center", className)}
    >
      {pending && <Loader2 className="size-4 animate-spin w-full absolute" />}
      <span className={`${pending ? "opacity-0" : ""}`}>{children}</span>
    </Button>
  );
}

export default ButtonSubmit;
