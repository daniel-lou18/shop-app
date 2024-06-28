import SidebarLayout from "@/components/ui/SidebarLayout";
import Sidebar from "@/components/ui/Sidebar";
import NavLink from "@/components/layout/navigation/NavLink";
import { paths } from "@/lib/paths";
import { ReactNode } from "react";

type AdminSettingsLayoutProps = {
  children: ReactNode;
};
function AdminSettingsLayout({ children }: AdminSettingsLayoutProps) {
  return (
    <SidebarLayout
      title="Paramètres"
      subtitle="Consulter et mettre à jour votre compte"
    >
      <Sidebar>
        <NavLink href={paths.customerSettingsAccount()}>Compte</NavLink>
        <NavLink href={paths.customerSettingsAddresses()}>Adresse</NavLink>
        <NavLink href={paths.customerOrders()}>Commandes</NavLink>
      </Sidebar>
      {children}
    </SidebarLayout>
  );
}

export default AdminSettingsLayout;
