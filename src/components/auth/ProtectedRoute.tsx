"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import ErrorPage from "../ui/ErrorPage";
import { UserRole } from "@prisma/client";
import { ExtendedUser } from "@/auth";

type ProtectedRouteProps = {
  children: ReactNode;
  user: ExtendedUser | undefined;
  allowedRole: UserRole;
};

function ProtectedRoute({ children, user, allowedRole }: ProtectedRouteProps) {
  const session = useSession();
  console.log({ protected: user });

  if (!user || user.role !== allowedRole) {
    return (
      <ErrorPage
        error={new Error("Vous n'êtes pas autorisé(e) à accéder à cette page")}
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
