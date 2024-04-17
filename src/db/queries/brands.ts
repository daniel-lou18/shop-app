import { db } from "@/db";
import { Brand } from "@prisma/client";

type AllBrands = Brand[];

export async function fetchAllBrands(): Promise<AllBrands> {
  return await db.brand.findMany({ orderBy: { name: "asc" } });
}
