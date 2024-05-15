"use server";

import * as auth from "@/auth";
import { paths } from "@/lib/paths";

export async function signOut() {
  return auth.signOut({ redirectTo: paths.customerHome() });
}
