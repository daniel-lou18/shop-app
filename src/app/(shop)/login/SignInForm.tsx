"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "./_components/Profile";
import ButtonLogin from "./_components/ButtonLogin";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import { useFormState } from "react-dom";
import FormFieldError from "@/components/ui/FormFieldError";
import { paths } from "@/lib/paths";
import InputField from "@/components/ui/InputField";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

function SignInForm() {
  const [formState, action] = useFormState(actions.signInUser, {});
  const searchParams = useSearchParams();

  if (searchParams.get("success") === "signup") {
    toast.success(
      "Votre compté a été créé. Vous pouvez vous connecter avec vos identifiants."
    );
  }

  return (
    <form className="flex flex-col items-center pt-32 w-full min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Saisissez votre email et votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <InputField name="email" variant="input" type="custom" />
              <FormFieldError>
                {formState.errors?.email?.join(", ")}
              </FormFieldError>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input name="password" id="password" type="password" />
              <FormFieldError>
                {formState.errors?.password?.join(", ")}
              </FormFieldError>
            </div>
            <ButtonSubmit className="w-full" formAction={action}>
              Login
            </ButtonSubmit>
            <div className="pointer-events-none opacity-50">
              <ButtonLogin variant="outline" />
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous n&apos;avez pas encore de compte professionnel ?{" "}
            <Link href={paths.customerSignup()} className="underline">
              Créer votre compte
            </Link>
          </div>
          <Profile />
        </CardContent>
      </Card>
    </form>
  );
}

export default SignInForm;
