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

  if (!user || user.role !== allowedRole) {
    return (
      <ErrorPage
        error={
          new Error(
            "Vous n'êtes pas autorisé(e) à accéder à cette page. Créez un compte professionnel ou connectez-vous à votre espace pro."
          )
        }
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
