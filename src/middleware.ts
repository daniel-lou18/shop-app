import { NextRequest } from "next/server";
export default function auth(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const isLoggedIn = req.cookies.has("authjs.session-token");
  console.log(isLoggedIn);
  if (pathName.startsWith("/api/auth")) return null;
  if (pathName === "/admin/login") {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin/products", req.nextUrl));
    }
    return null;
  }
  if (
    pathName.startsWith("/admin") &&
    !isLoggedIn &&
    pathName !== "/admin/login" &&
    pathName !== "/admin/signup"
  ) {
    return Response.redirect(new URL("/admin/login", req.nextUrl));
  }
  return null;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
