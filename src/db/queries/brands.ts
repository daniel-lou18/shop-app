import { db } from "@/db";
import { Brand, Sex } from "@prisma/client";
import { FetchResult } from "./products";
import { handleFetchError } from "@/lib/errors";

export type AllBrands = Brand[];

export async function fetchBrands(sex?: Sex): Promise<FetchResult<AllBrands>> {
  try {
    const result = await db.brand.findMany({
      where: { sex },
      orderBy: { name: "asc" },
    });
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des marques"
    );
  }
}
