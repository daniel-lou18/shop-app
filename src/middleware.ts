import { auth } from "./auth";
import { paths } from "./lib/paths";

export default auth((req) => {
  const pathName = req.nextUrl.pathname;
  const session = req.auth;
  const isLoggedIn = !!session;
  console.log(isLoggedIn);
  if (pathName.startsWith("/api/auth")) return null;
  // Redirect to admin dashboard if user is logged in and tries to access login page
  if (pathName === paths.adminSignIn()) {
    if (isLoggedIn && session.user.role === "ADMIN") {
      return Response.redirect(new URL(paths.adminProducts(), req.nextUrl));
    }
    return null;
  }
  // Redirect users to admin login page if they try to access admin pages without being logged in
  if (pathName.startsWith(paths.adminHome()) && !isLoggedIn) {
    return Response.redirect(new URL(paths.adminSignIn(), req.nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
