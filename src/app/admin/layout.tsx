import { ReactNode } from "react";
import HeaderAdmin from "./_components/HeaderAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderAdmin />
      <div className="p-4 sm:px-16 sm:py-4 bg-gray-50 min-h-screen">
        {children}
      </div>
    </>
  );
}
