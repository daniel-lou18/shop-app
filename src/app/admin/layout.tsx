import { ReactNode } from "react";
import HeaderAdmin from "./_components/HeaderAdmin";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { paths } from "@/helpers/helpers";

async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session || !session.user) {
    redirect(paths.login());
  }

  return (
    <>
      <HeaderAdmin />
      <div className="p-4 sm:px-16 sm:py-4 bg-gray-50 min-h-screen">
        {children}
      </div>
    </>
  );
}

export default AdminLayout;
