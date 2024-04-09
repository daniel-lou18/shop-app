import { ReactNode } from "react";
import HeaderAdmin from "./_components/HeaderAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderAdmin />
      {children}
    </>
  );
}
