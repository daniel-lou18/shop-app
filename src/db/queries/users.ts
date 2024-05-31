import { handleFetchError } from "@/lib/errors";
import { db } from "..";
import { FetchResult } from "./products";
import { User } from "@prisma/client";

export async function fetchUsers(): Promise<FetchResult<User[]>> {
  try {
    const result = await db.user.findMany({ orderBy: { name: "asc" } });
    if (!result || result.length === 0)
      throw new Error("Nous n'avons pas trouvé de clients");
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return handleFetchError(err);
  }
}
