import InputField, { InputFieldProps } from "@/components/ui/InputField";
import FormFieldError from "@/components/error/FormFieldError";

type FormSettingsFieldProps = {
  name: string;
  variant: InputFieldProps["variant"];
  value: string;
  error: string[];
};
function FormSettingsField({
  name,
  variant,
  value,
  error,
}: FormSettingsFieldProps) {
  return (
    <div className="sm:col-span-4">
      <InputField name={name} variant={variant} value={value} type="edit" />
      <FormFieldError>{error?.join(", ")}</FormFieldError>
    </div>
  );
}

export default FormSettingsField;
