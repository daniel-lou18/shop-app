import { AddProductSchemaType } from "@/actions/add-product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./textarea";
import { capitalizeString, strNoAccent } from "@/lib/parsers";
import { mapToFrench } from "@/helpers/helpers";

export type InputFieldProps = {
  variant: "input" | "textarea" | "number" | "email" | "password";
  type: "add" | "edit" | "custom";
  name: string;
  value?: string | number | undefined;
  errorObject?: AddProductSchemaType;
};
function InputField({
  variant,
  type,
  name,
  value,
  errorObject,
}: InputFieldProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={name}>
        {mapToFrench[name as keyof typeof mapToFrench] ||
          capitalizeString(name)}
      </Label>
      {variant === "input" && (
        <Input
          id={name}
          type="text"
          className="w-full"
          defaultValue={type === "edit" ? value : ""}
          placeholder={type === "add" ? "Saisissez le nom du produit" : ""}
          name={name}
        />
      )}
      {variant === "textarea" && (
        <Textarea
          id={name}
          className="min-h-32"
          defaultValue={type === "edit" ? value : ""}
          placeholder={
            type === "add" ? "Saisissez la description du produit" : ""
          }
          name={name}
        />
      )}
      {variant === "number" && (
        <Input
          id={name}
          type="number"
          className="w-full"
          defaultValue={type === "edit" ? value : 0}
          name={name}
          min={0}
        />
      )}
      {variant === "email" && (
        <Input id={name} type="email" className="w-full" name={name} />
      )}
      {variant === "password" && (
        <Input id={name} type="password" className="w-full" name={name} />
      )}
    </div>
  );
}

export default InputField;
