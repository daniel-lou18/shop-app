"use client";

import ButtonSubmit from "@/components/ui/ButtonSubmit";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormFieldError from "@/components/error/FormFieldError";
import { toast } from "sonner";
import { useEffect } from "react";
import { paths } from "@/lib/paths";

function SignUpFormAdmin() {
  const [formState, action] = useFormState(
    actions.signUp.bind(null, "ADMIN"),
    {}
  );

  useEffect(() => {
    if (formState?.errors) {
      if (formState?.errors._form)
        toast.error(formState?.errors._form.join(", "));
      else toast.error("Veuillez corriger les erreurs s'il vous plaît");
    }
  }, [formState]);

  return (
    <form
      action={action}
      className="mx-auto max-w-[60rem] flex flex-col px-8 my-8"
    >
      <h2 className="text-xl font-semibold leading-7 text-gray-900">
        Créer mon compte
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Veuillez saisir vos informations personnelles
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <InputField name="firstName" variant="input" type="custom" />
          <FormFieldError>
            {formState?.errors?.firstName?.join(", ")}
          </FormFieldError>
        </div>

        <div className="sm:col-span-3">
          <InputField name="lastName" variant="input" type="custom" />
          <FormFieldError>
            {formState?.errors?.lastName?.join(", ")}
          </FormFieldError>
        </div>

        <div className="sm:col-span-4">
          <InputField name="email" variant="email" type="custom" />
          <FormFieldError>
            {formState?.errors?.email?.join(", ")}
          </FormFieldError>
        </div>

        <div className="sm:col-span-3">
          <InputField name="password" variant="password" type="custom" />
          <FormFieldError>
            {formState?.errors?.password?.join(", ")}
          </FormFieldError>
        </div>

        <div className="sm:col-span-3">
          <InputField
            name="passwordConfirmation"
            variant="password"
            type="custom"
          />
          <FormFieldError>
            {formState?.errors?.passwordConfirmation?.join(", ")}
          </FormFieldError>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Pays
          </label>
          <div className="mt-2">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>France</option>
              <option>Belgique</option>
              <option>Luxembourg</option>
            </select>
          </div>
          <FormFieldError>
            {formState?.errors?.country?.join(", ")}
          </FormFieldError>
        </div>

        <div className="col-span-full">
          <InputField name="address" variant="input" type="custom" />
          <FormFieldError>
            {formState?.errors?.address?.join(", ")}
          </FormFieldError>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <InputField name="city" variant="input" type="custom" />
          <FormFieldError>{formState?.errors?.city?.join(", ")}</FormFieldError>
        </div>

        <div className="sm:col-span-2">
          <InputField name="state" variant="input" type="custom" />
          <FormFieldError>
            {formState?.errors?.state?.join(", ")}
          </FormFieldError>
        </div>

        <div className="sm:col-span-2">
          <InputField name="zip" variant="input" type="custom" />
          <FormFieldError>{formState?.errors?.zip?.join(", ")}</FormFieldError>
        </div>
      </div>
      <div className="items-center gap-2 flex mt-8 self-end">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={paths.adminSignIn()}>Annuler </Link>
        </Button>
        <ButtonSubmit>Créer mon compte</ButtonSubmit>
      </div>
    </form>
  );
}

export default SignUpFormAdmin;
