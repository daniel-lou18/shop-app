"use server";

import * as auth from "@/auth";
import { paths } from "@/lib/paths";

export async function signIn() {
  return auth.signIn("github", { redirectTo: paths.adminProducts() });
}
