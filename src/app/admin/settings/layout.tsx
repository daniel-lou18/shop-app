import SidebarLayout from "@/components/ui/SidebarLayout";
import Sidebar from "@/components/ui/Sidebar";
import NavLink from "@/components/ui/NavLink";
import { paths } from "@/lib/paths";
import { ReactNode } from "react";

type AdminSettingsLayoutProps = {
  children: ReactNode;
};
function AdminSettingsLayout({ children }: AdminSettingsLayoutProps) {
  return (
    <SidebarLayout
      title="Paramètres"
      subtitle="Consulter et mettre à jour votre compte et vos paramètres"
    >
      <Sidebar>
        <NavLink href={paths.adminSettingsAccount()}>Compte</NavLink>
        <NavLink href={paths.adminSettingsShop()}>Boutique</NavLink>
      </Sidebar>
      {children}
    </SidebarLayout>
  );
}

export default AdminSettingsLayout;
