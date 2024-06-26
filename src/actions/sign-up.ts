"use server";

import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { handleActionError } from "@/lib/errors";
import { db } from "@/db";
import { getUserByEmail } from "@/db/queries/user";
import { UserRole } from "@prisma/client";

const signUpSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().min(3).email().max(50),
  password: z.string().min(8).max(50),
  passwordConfirmation: z.string().min(8).max(50),
  country: z.enum(["France", "Belgique", "Suisse"]),
  address: z.string().min(3).max(100),
  city: z.string().min(2).max(75),
  state: z.string().min(2).max(50),
  zip: z.coerce.number().min(1000).max(99999),
});

type SignUpSchemaType = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
    country?: string[];
    address?: string[];
    city?: string[];
    state?: string[];
    zip?: string[];
    _form?: string[];
  };
};

export async function signUp(
  type: UserRole,
  formState: SignUpSchemaType,
  formData: FormData
): Promise<SignUpSchemaType> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = signUpSchema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    passwordConfirmation: formData.get("passwordConfirmation") as string,
    country: formData.get("country") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zip: formData.get("zip") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const { password, passwordConfirmation } = result.data;
    if (password !== passwordConfirmation) {
      return {
        errors: {
          password: ["Les mots de passe ne sont pas identiques"],
          passwordConfirmation: ["Les mots de passe ne sont pas identiques"],
        },
      };
    }

    const existingUser = await getUserByEmail(result.data.email);
    if (existingUser) {
      throw new Error("Il existe déja un utilisateur avec cette adresse email");
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    await db.user.create({
      data: {
        ...result.data,
        password: hashedPassword,
        passwordConfirmation: null,
        role: type,
      },
    });
  } catch (err: unknown) {
    return handleActionError(
      err,
      "Une erreur est survenue lors de l'inscription"
    );
  }

  if (type === "USER") {
    redirect(paths.customerSignIn("signup=success"));
  } else {
    redirect(paths.adminSignIn("signup=success"));
  }
}
