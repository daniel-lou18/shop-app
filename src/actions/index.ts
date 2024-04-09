"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import * as auth from "@/auth";

export async function signIn() {
  return auth.signIn("github");
}

export async function signOut() {
  return auth.signOut();
}
