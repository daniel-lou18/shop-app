import { db } from "@/db";
import { Brand } from "@prisma/client";

export type AllBrands = Brand[];

export async function fetchAllBrands(): Promise<AllBrands> {
  return await db.brand.findMany({ orderBy: { name: "asc" } });
}

export async function fetchMenBrands(): Promise<AllBrands> {
  return await db.brand.findMany({
    where: { sex: "men" },
    orderBy: { name: "asc" },
  });
}

export async function fetchWomenBrands(): Promise<AllBrands> {
  return await db.brand.findMany({
    where: { sex: "women" },
    orderBy: { name: "asc" },
  });
}
