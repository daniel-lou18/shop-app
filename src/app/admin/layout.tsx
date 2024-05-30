import { ReactNode } from "react";
import HeaderAdmin from "./_components/HeaderAdmin";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <ProtectedRoute user={session?.user} allowedRole={UserRole.ADMIN}>
      <HeaderAdmin />
      <div className="p-4 sm:px-16 sm:py-4 bg-gray-50 min-h-screen">
        {children}
      </div>
    </ProtectedRoute>
  );
}

export default AdminLayout;
