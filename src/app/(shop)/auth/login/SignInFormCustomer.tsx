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
import FormFieldError from "@/components/ui/FormFieldError";
import { paths } from "@/lib/paths";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

function SignInFormCustomer() {
  const [formState, action] = useFormState(
    actions.signIn.bind(null, "USER"),
    {}
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("signup") === "success" && !formState?.errors) {
      toast.success(
        "Votre compté a été créé. Vous pouvez vous connecter avec vos identifiants."
      );
    }
    if (formState?.errors?._form) {
      toast.error(formState?.errors?._form.join(", "));
    }
  }, [formState, searchParams]);

  return (
    <form className="flex flex-col items-center pt-32 w-full min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            {searchParams.get("redirect") === "/cart" && !formState?.errors
              ? "Pour poursuivre votre commande, connectez-vous ou créez votre compte"
              : "Saisissez votre email et votre mot de passe"}
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
                placeholder="loutje3@mail.com"
              />
              <FormFieldError>
                {formState?.errors?.email?.join(", ")}
              </FormFieldError>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="123123123"
              />
              <FormFieldError>
                {formState?.errors?.password?.join(", ")}
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
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link href={paths.customerSignUp()} className="underline">
              Créer votre compte
            </Link>
          </div>
          <Profile />
        </CardContent>
      </Card>
    </form>
  );
}

export default SignInFormCustomer;
