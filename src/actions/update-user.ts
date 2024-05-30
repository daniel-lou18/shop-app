"use server";

import { db } from "@/db";
import { handleActionError } from "@/lib/errors";
import { paths } from "@/lib/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UserAccountSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().min(3).email().max(50),
  image: z.string().optional(),
});

export type UserAccountSchemaType = {
  success?: boolean;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    image?: string[];
    _form?: string[];
  };
};

export async function updateUserAccount(
  id: string | undefined,
  formState: UserAccountSchemaType,
  formData: FormData
): Promise<UserAccountSchemaType> {
  if (!id) {
    return { success: false, errors: { _form: ["Id utilisateur manquant"] } };
  }

  const result = UserAccountSchema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    image: formData.get("image") as string,
  });

  if (!result.success) {
    console.log(result.error);
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    await db.user.update({
      where: { id },
      data: result.data,
    });
  } catch (err: unknown) {
    handleActionError(
      err,
      "Une erreur est survenue lors de la modification des données du compte"
    );
  }
  revalidatePath(paths.customerSettingsAccount());
  return { success: true };
}
