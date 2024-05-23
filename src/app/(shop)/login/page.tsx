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

function LoginForm() {
  const [formState, action] = useFormState(actions.signInUser, {});

  return (
    <main className="flex flex-col items-center pt-32 w-full min-h-screen">
      <form>
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
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
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
              <Link href="#" className="underline pointer-events-none">
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

export default LoginForm;
