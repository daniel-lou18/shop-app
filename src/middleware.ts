import { auth } from "./auth";
import { paths } from "./lib/paths";

export default auth((req) => {
  const pathName = req.nextUrl.pathname;
  const session = req.auth;
  const isLoggedIn = !!session;
  console.log(isLoggedIn);
  if (pathName.startsWith("/api/auth")) return null;
  if (pathName === paths.adminSignIn()) {
    if (isLoggedIn && session.user.role === "ADMIN") {
      return Response.redirect(new URL(paths.adminProducts(), req.nextUrl));
    }
    return null;
  }
  if (
    pathName.startsWith(paths.adminHome()) &&
    !isLoggedIn &&
    pathName !== paths.adminSignIn() &&
    pathName !== paths.adminSignUp()
  ) {
    return Response.redirect(new URL(paths.adminSignIn(), req.nextUrl));
  }

  if (
    isLoggedIn &&
    session.user.role === "USER" &&
    pathName.startsWith(paths.adminHome()) &&
    pathName !== paths.adminSignIn() &&
    pathName !== paths.adminSignUp()
  ) {
    return Response.redirect(new URL(paths.customerHome(), req.nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
