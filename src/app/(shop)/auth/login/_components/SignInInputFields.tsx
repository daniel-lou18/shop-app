import { SignInSchemaType } from "@/actions/sign-in";
import FormFieldError from "@/components/error/FormFieldError";
import BaseComponent from "@/components/ui/BaseComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function SignInInputFields({ formState }: { formState: SignInSchemaType }) {
  return (
    <>
      <BaseComponent className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="loutje@mail.com"
        />
        <FormFieldError>{formState?.errors?.email?.join(", ")}</FormFieldError>
      </BaseComponent>
      <BaseComponent className="grid gap-2">
        <BaseComponent className="flex items-center">
          <Label htmlFor="password">Mot de passe</Label>
          <Link href="#" className="ml-auto inline-block text-sm underline">
            Mot de passe oublié ?
          </Link>
        </BaseComponent>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="123123123"
        />
        <FormFieldError>
          {formState?.errors?.password?.join(", ")}
        </FormFieldError>
      </BaseComponent>
    </>
  );
}

export default SignInInputFields;
