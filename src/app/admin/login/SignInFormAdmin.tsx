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
import Profile from "./_components/Profile";
import ButtonLogin from "./_components/ButtonLogin";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import FormFieldError from "@/components/ui/FormFieldError";
import { paths } from "@/lib/paths";

function SignInFormAdmin() {
  const [formState, action] = useFormState(
    actions.signInUser.bind(null, "admin"),
    {}
  );

  useEffect(() => {
    if (formState?.errors?._form) {
      toast.error(formState?.errors?._form.join(", "));
    }
  }, [formState]);

  return (
    <main className="flex flex-col items-center pt-32 w-full min-h-screen">
      <form action={action}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="">
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Saisissez votre email et votre mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                <FormFieldError>
                  {formState?.errors?.email?.join(", ")}
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
                  {formState?.errors?.password?.join(", ")}
                </FormFieldError>
              </div>
              <ButtonSubmit className="w-full">Login</ButtonSubmit>
              {/* <form action={actions.signInAdmin}>
              <ButtonLogin />
            </form> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Vous n&apos;avez pas encore de compte professionnel ?{" "}
              <Link href={paths.adminSignUp()} className="underline">
                Créer votre compte
              </Link>
            </div>
            <Profile />
          </CardContent>
        </Card>
      </form>
    </main>
  );
}

export default SignInFormAdmin;
