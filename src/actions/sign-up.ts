"use server";

import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().min(3).email().max(50),
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
    country?: string[];
    address?: string[];
    city?: string[];
    state?: string[];
    zip?: string[];
    _form?: string[];
  };
};

export async function signUpUser(
  formState: SignUpSchemaType,
  formData: FormData
): Promise<SignUpSchemaType> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = signUpSchema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    country: formData.get("country") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zip: formData.get("zip") as string,
  });

  if (!result.success) {
    console.log(result.error);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return redirect(paths.customerLogin("success=signup"));
}
