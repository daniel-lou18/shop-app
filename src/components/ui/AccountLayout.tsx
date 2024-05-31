import { ReactNode } from "react";
import PageHeading1 from "@/components/ui/PageHeading1";

function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl md:py-8">
      <PageHeading1 className="mb-1">Paramètres</PageHeading1>
      <p className="pb-6 leading-6 text-gray-600">
        Consulter et mettre à jour votre compte et vos paramètres
      </p>
      <div className="grid items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] pt-6 border-t border-gray-200 border-solid">
        {children}
      </div>
    </div>
  );
}

export default AccountLayout;
