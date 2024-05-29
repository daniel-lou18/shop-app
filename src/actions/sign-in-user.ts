"use server";

import { paths } from "@/lib/paths";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { signInSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

type SignInSchemaType = {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};

export async function signInUser(
  type: "user" | "admin",
  formState: SignInSchemaType,
  formData: FormData
): Promise<SignInSchemaType> {
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

  try {
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });
  } catch (err) {
    if (err instanceof Error) {
      switch (err.message) {
        case "CredentialsSignin":
          return {
            errors: {
              _form: ["Email ou mot de passe incorrect"],
            },
          };
        default:
          return {
            errors: {
              _form: [err.message],
            },
          };
      }
    }
    throw err;
  }
  if (type === "user") {
    revalidatePath(paths.customerHome());
    redirect(paths.customerHome());
  } else {
    redirect(paths.adminProducts());
  }
}

// export async function signInAdmin() {
//   return auth.signIn("github", { redirectTo: paths.adminProducts() });
// }
