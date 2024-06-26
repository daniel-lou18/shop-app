"use client";

import ButtonSubmit from "@/components/ui/ButtonSubmit";
import InputField, { InputFieldProps } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import FormFieldError from "@/components/error/FormFieldError";
import { toast } from "sonner";
import { useEffect } from "react";
import { paths } from "@/lib/paths";
import { User } from "@prisma/client";
import { UserAccountSchemaType } from "@/actions/update-user";

type SchemaTypeErrors = {
  [key: string]: string[];
};

type FormSettingsProps = {
  title: string;
  subtitle: string;
  fields: Partial<User>;
  formAction: (
    formState: UserAccountSchemaType,
    formData: FormData
  ) => Promise<UserAccountSchemaType>;
};

function FormSettings({
  title,
  subtitle,
  fields,
  formAction,
}: FormSettingsProps) {
  const [formState, action] = useFormState(formAction, {});

  useEffect(() => {
    if (formState?.success) {
      toast.success("Les informations ont été mises à jour");
    }
    if (formState?.success === false) {
      if (formState?.errors?._form)
        toast.error(formState?.errors._form.join(", "));
      else toast.error("Veuillez corriger les erreurs s'il vous plaît");
    }
  }, [formState]);

  return (
    <form action={action} className="max-w-[59rem] flex flex-col">
      <h2 className="text-xl font-semibold leading-7 text-gray-900">{title}</h2>
      <p className="text-sm leading-6 text-gray-600 pb-4">{subtitle}</p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-4 border-t border-gray-200 border-solid">
        {Object.entries(fields).map(([key, value]) => (
          <div className="sm:col-span-4" key={key}>
            <InputField
              name={key}
              variant="input"
              value={value ? value.toString() : ""}
              type="edit"
            />
            <FormFieldError>
              {formState?.errors &&
                (formState.errors as SchemaTypeErrors)?.[key]?.join(", ")}
            </FormFieldError>
          </div>
        ))}
      </div>
      <div className="items-center gap-2 flex mt-8">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={paths.adminSignIn()}>Annuler </Link>
        </Button>
        <ButtonSubmit>Enregistrer</ButtonSubmit>
      </div>
    </form>
  );
}

export default FormSettings;
