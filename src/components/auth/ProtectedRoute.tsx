"use client";

import { ReactNode } from "react";
import ErrorPage from "../error/ErrorPage";
import { UserRole } from "@prisma/client";
import { ExtendedUser } from "@/auth";

type ProtectedRouteProps = {
  children: ReactNode;
  user: ExtendedUser | undefined;
  allowedRole: UserRole;
};

/*The only task of this component is to check if the user is authenticated and if the user has the correct role.
 * If the user is not authenticated or does not have the correct role, it displays an error page.
 * If the user is authenticated and has the correct role, it renders the children.
 * This is a client component but it can pass server components as children.
 */
function ProtectedRoute({ children, user, allowedRole }: ProtectedRouteProps) {
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
