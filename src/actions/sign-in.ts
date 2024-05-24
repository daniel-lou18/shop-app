"use server";

import * as auth from "@/auth";
import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email().min(3).max(50),
  password: z.string().min(8).max(50),
});

type signInSchemaType = {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};

export async function signInUser(
  formState: signInSchemaType,
  formData: FormData
): Promise<signInSchemaType> {
  const result = signInSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!result.success) {
    console.log(result.error);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return redirect(paths.customerHome());
}

export async function signInAdmin() {
  return auth.signIn("github", { redirectTo: paths.adminProducts() });
}
