"use server";

import * as auth from "@/auth";
import { paths } from "@/helpers/helpers";

export async function signIn() {
  return auth.signIn("github", { redirectTo: paths.adminProducts() });
}
