"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

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
      type={`${pending ? "button" : "submit"}`}
      size={size}
      className={className}
    >
      <div className="relative">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {pending && <Loader2 className="size-4 animate-spin" />}
        </span>
        <span className={`${pending ? "opacity-0" : ""}`}>{children}</span>
      </div>
    </Button>
  );
}

export default ButtonSubmit;
