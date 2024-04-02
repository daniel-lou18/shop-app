import { NavLink, Navbar } from "@/components/ui/Navbar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Produits</NavLink>
        <NavLink href="/admin/customers">Clients</NavLink>
        <NavLink href="/admin/orders">Commandes</NavLink>
      </Navbar>
      {children}
    </>
  );
}
