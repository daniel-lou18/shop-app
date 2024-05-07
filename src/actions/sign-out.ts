"use server";

import * as auth from "@/auth";
import { paths } from "@/helpers/helpers";

export async function signOut() {
  return auth.signOut({ redirectTo: paths.customerHome() });
}
