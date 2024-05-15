import { db } from "@/db";
import { Brand } from "@prisma/client";
import { FetchResult } from "./products";
import { handleFetchError } from "@/lib/errors";

export type AllBrands = Brand[];

export async function fetchBrands(
  sex?: "homme" | "femme"
): Promise<FetchResult<AllBrands>> {
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

// export async function fetchMenBrands(): Promise<FetchResult<AllBrands>> {
//   try {
//     const result = await db.brand.findMany({
//       where: { sex: "homme" },
//       orderBy: { name: "asc" },
//     });
//     return { success: true, data: result };
//   } catch (err) {
//     return handleFetchError(
//       err,
//       "Une erreur est survenue lors de la récupération des marques homme"
//     );
//   }
// }

// export async function fetchWomenBrands(): Promise<FetchResult<AllBrands>> {
//   try {
//     const result = await db.brand.findMany({
//       where: { sex: "femme" },
//       orderBy: { name: "asc" },
//     });
//     return { success: true, data: result };
//   } catch (err) {
//     return handleFetchError(
//       err,
//       "Une erreur est survenue lors de la récupération des marques femme"
//     );
//   }
// }
