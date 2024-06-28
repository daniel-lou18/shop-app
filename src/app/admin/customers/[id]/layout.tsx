import SidebarLayout from "@/components/ui/SidebarLayout";
import Sidebar from "@/components/ui/Sidebar";
import NavLink from "@/components/layout/navigation/NavLink";
import { paths } from "@/lib/paths";
import { ReactNode } from "react";

type CustomerDetailsLayoutProps = {
  children: ReactNode;
  params: { id: string };
};
function CustomerDetailsLayout({
  children,
  params,
}: CustomerDetailsLayoutProps) {
  return (
    <SidebarLayout
      title="Compte client"
      subtitle="Retrouver les informations personnelles et les commandes du client"
    >
      <Sidebar>
        <NavLink href={paths.adminCustomerAccount(params.id)}>Compte</NavLink>
        <NavLink href={paths.adminCustomerAddresses(params.id)}>
          Adresse
        </NavLink>
        <NavLink href="#">Commandes</NavLink>
      </Sidebar>
      {children}
    </SidebarLayout>
  );
}

export default CustomerDetailsLayout;
