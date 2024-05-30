import { handleFetchError } from "@/lib/errors";
import { db } from "..";
import { FetchResult } from "./products";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (err) {
    return null;
  }
}

export async function getUserById(id: string) {
  if (!id) return null;
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (err) {
    return null;
  }
}

export async function fetchUserById(
  id: string | undefined
): Promise<FetchResult<User>> {
  try {
    if (!id) throw new Error("Id manquant");
    const result = await db.user.findUnique({ where: { id } });
    if (!result) throw new Error("Nous n'avons pas trouvé l'utilisateur");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération de l'utilisateur"
    );
  }
}
