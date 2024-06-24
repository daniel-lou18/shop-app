import { ReactNode } from "react";
import PageHeading1 from "@/components/ui/PageHeading1";
import { Breadcrumbs } from "./Breadcrumbs";

type SidebarLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

function SidebarLayout({ children, title, subtitle }: SidebarLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-6xl md:py-8">
      <Breadcrumbs slug={["Paramètres", undefined, undefined]} />
      <PageHeading1 className="mb-1 text-3xl">{title}</PageHeading1>
      <p className="pb-6 leading-6 text-gray-600 text-sm">{subtitle}</p>
      <div className="grid items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] pt-6 border-t border-gray-200 border-solid">
        {children}
      </div>
    </div>
  );
}

export default SidebarLayout;
