import { ReactNode } from "react";

function FormFieldError({ children }: { children: ReactNode }) {
  return <p className="text-sm text-red-700">{children}</p>;
}

export default FormFieldError;
