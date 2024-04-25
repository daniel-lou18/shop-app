import { db } from "@/db";
import { Brand } from "@prisma/client";

export type AllBrands = Brand[];

export async function fetchAllBrands(): Promise<AllBrands> {
  return await db.brand.findMany({ orderBy: { name: "asc" } });
}

export async function fetchMenBrands(): Promise<AllBrands> {
  return await db.brand.findMany({
    where: { sex: "homme" },
    orderBy: { name: "asc" },
  });
}

export async function fetchWomenBrands(): Promise<AllBrands> {
  return await db.brand.findMany({
    where: { sex: "femme" },
    orderBy: { name: "asc" },
  });
}
