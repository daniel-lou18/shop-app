"use client";

import ButtonSubmit from "@/components/ui/ButtonSubmit";
import InputField, { InputFieldProps } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormFieldError from "@/components/ui/FormFieldError";
import { toast } from "sonner";
import { useEffect } from "react";
import { paths } from "@/lib/paths";
import { User } from "@prisma/client";

type FormSettingsProps = {
  title: string;
  subtitle: string;
  fields: Partial<User>;
  formAction: (
    formState: {
      success?: boolean;
      errors?: { _form?: string[] };
    },
    formData: FormData
  ) => Promise<{ success?: boolean; errors?: { _form?: string[] } }>;
};

function FormSettings({
  title,
  subtitle,
  fields,
  formAction,
}: FormSettingsProps) {
  const [formState, action] = useFormState(formAction, {});

  useEffect(() => {
    if (formState.success) {
      toast.success("Les informations ont été mises à jour");
    }
    if (!formState?.success) {
      if (formState?.errors._form)
        toast.error(formState?.errors._form.join(", "));
      else toast.error("Veuillez corriger les erreurs s'il vous plaît");
    }
  }, [formState]);

  return (
    <form action={action} className="max-w-[59rem] flex flex-col">
      <h2 className="text-xl font-semibold leading-7 text-gray-900">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{subtitle}</p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {Object.entries(fields).map(([key, value]) => (
          <div className="sm:col-span-4" key={key}>
            <InputField name={key} variant="input" value={value} type="edit" />
            <FormFieldError>
              {formState?.errors?.[key]?.join(", ")}
            </FormFieldError>
          </div>
        ))}
      </div>
      <div className="items-center gap-2 flex mt-8 self-end">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={paths.adminSignIn()}>Annuler </Link>
        </Button>
        <ButtonSubmit>Enregistrer</ButtonSubmit>
      </div>
    </form>
  );
}

export default FormSettings;
