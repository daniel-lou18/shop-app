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

async function LoginForm() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center pt-32 w-full min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className=" opacity-50">
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Saisissez votre email et votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2 opacity-50">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled
              />
            </div>
            <div className="grid gap-2 opacity-50">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input id="password" type="password" disabled />
            </div>
            {/* <form>
              <ButtonSubmit className="w-full">Login</ButtonSubmit>
            </form> */}
            <form action={actions.signIn}>
              <ButtonLogin />
            </form>
          </div>
          <div className="mt-4 text-center text-sm opacity-50">
            Vous n&apos;avez pas encore de compte professionnel ?{" "}
            <Link href="#" className="underline pointer-events-none">
              Créer votre compte
            </Link>
          </div>
          <Profile />
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginForm;
