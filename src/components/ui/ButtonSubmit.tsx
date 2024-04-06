"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

function ButtonSubmit({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="relative">
      {pending && <Loader2 className="size-4 animate-spin w-full absolute" />}
      <span className={`${pending ? "opacity-0" : ""}`}>{children}</span>
    </Button>
  );
}

export default ButtonSubmit;
