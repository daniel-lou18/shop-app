"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { FormEventHandler, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariantType = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

type ButtonSubmitProps = {
  children: ReactNode;
  size?: "sm" | "lg";
  className?: string;
  onClick?: () => void;
  formAction?: (formData: FormData) => void;
} & ButtonVariantType;

function ButtonSubmit({
  children,
  className,
  size = "sm",
  variant,
  onClick,
  formAction,
}: ButtonSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type={`${pending ? "button" : "submit"}`}
      size={size}
      className={className}
      variant={variant}
      onClick={onClick}
      formAction={formAction}
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
