import { AddProductSchemaType } from "@/actions/add-product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./textarea";

const ToFrench = {
  name: "Nom",
  description: "Description",
  price: "Prix",
  quantity: "Quantité",
  category: "Catégorie",
  brand: "Marque",
  color: "Couleur",
  size: "Taille",
  image: "Image",
};

type InputFieldProps = {
  variant: "input" | "textarea" | "number";
  type: "add" | "edit";
  value?: string | number | undefined;
  name: string;
  errorObject?: AddProductSchemaType;
};
function InputField({
  variant,
  type,
  value,
  name,
  errorObject,
}: InputFieldProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={name}>{ToFrench[name as keyof typeof ToFrench]}</Label>
      {variant === "input" && (
        <Input
          id={name}
          type="text"
          className="w-full"
          defaultValue={type === "edit" ? value : ""}
          placeholder={type !== "edit" ? "Saisissez le nom du produit" : ""}
          name={name}
        />
      )}
      {variant === "textarea" && (
        <Textarea
          id={name}
          className="min-h-32"
          defaultValue={type === "edit" ? value : ""}
          placeholder={
            type !== "edit" ? "Saisissez la description du produit" : ""
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
          step={0.01}
        />
      )}
      {errorObject && errorObject.errors?.name && (
        <p className="text-red-500 text-xs">
          {errorObject.errors.name.join(", ")}
        </p>
      )}
    </div>
  );
}

export default InputField;
