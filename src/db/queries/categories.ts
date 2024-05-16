import { db } from "@/db";
import { Category } from "@prisma/client";
import { FetchResult } from "./products";
import { handleFetchError } from "@/lib/errors";

export type AllCategories = Category[];

export async function fetchCategories(
  sex?: "homme" | "femme"
): Promise<FetchResult<AllCategories>> {
  try {
    const result = await db.category.findMany({
      where: { sex },
      orderBy: { name: "asc" },
    });
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des categories"
    );
  }
}
