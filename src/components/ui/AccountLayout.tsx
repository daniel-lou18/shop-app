import { ReactNode } from "react";
import PageHeading1 from "@/components/ui/PageHeading1";

function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl md:py-8">
      <PageHeading1>Paramètres</PageHeading1>
      <div className="grid items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        {children}
      </div>
    </div>
  );
}

export default AccountLayout;
