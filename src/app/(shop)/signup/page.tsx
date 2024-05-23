import ButtonSubmit from "@/components/ui/ButtonSubmit";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function RegisterPage() {
  return (
    <form className="mx-auto max-w-[59rem] flex flex-col">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Information personnelles
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Utilisez une adresse e-mail permanente sur laquelle vous pouvez recevoir
        et lire des e-mails.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <InputField name="Prénom" variant="input" type="custom" />
        </div>

        <div className="sm:col-span-3">
          <InputField name="Nom" variant="input" type="custom" />
        </div>

        <div className="sm:col-span-4">
          <InputField name="Email" variant="input" type="custom" />
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
        </div>

        <div className="col-span-full">
          <InputField name="Adresse" variant="input" type="custom" />
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <InputField name="Ville" variant="input" type="custom" />
        </div>

        <div className="sm:col-span-2">
          <InputField name="Département" variant="input" type="custom" />
        </div>

        <div className="sm:col-span-2">
          <InputField name="Code postal" variant="input" type="custom" />
        </div>
      </div>
      <div className="items-center gap-2 flex mt-8 self-end">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href="/admin/products">Annuler </Link>
        </Button>
        <ButtonSubmit>Sauvegarder</ButtonSubmit>
      </div>
    </form>
  );
}

export default RegisterPage;
