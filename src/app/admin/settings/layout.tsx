import AccountLayout from "@/components/ui/AccountLayout";
import Sidebar from "@/components/ui/Sidebar";
import NavLink from "@/components/ui/NavLink";
import { paths } from "@/lib/paths";
import { ReactNode } from "react";

type AdminSettingsLayoutProps = {
  children: ReactNode;
};
function AdminSettingsLayout({ children }: AdminSettingsLayoutProps) {
  return (
    <AccountLayout>
      <Sidebar>
        <NavLink href={paths.adminSettingsAccount()}>Compte</NavLink>
        <NavLink href={paths.adminSettingsShop()}>Boutique</NavLink>
      </Sidebar>
      {children}
    </AccountLayout>
  );
}

export default AdminSettingsLayout;
