import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { paths } from "@/lib/paths";
import ButtonSubmit from "@/components/ui/ButtonSubmit";

async function AdminSettingsShop() {
  return (
    <form className="max-w-[59rem] flex flex-col">
      <h2 className="text-xl font-semibold leading-7 text-gray-900">
        Votre boutique
      </h2>
      <p className="text-sm leading-6 text-gray-600 pb-4">
        Gérer et modifier les paramètres de votre boutique
      </p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-6 border-t border-gray-200 border-solid">
        <Card className="sm:col-span-4">
          <CardHeader>
            <CardTitle>Nom de votre boutique</CardTitle>
            <CardDescription>
              Ce nom sera utilisé pour identifier votre magasin et sera
              également affiché sur le site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input placeholder="Pas encore fonctionnel" />
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <ButtonSubmit>Enregistrer</ButtonSubmit>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}

export default AdminSettingsShop;
