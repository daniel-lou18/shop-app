import { db } from "@/db";
import { Category } from "@prisma/client";

export type AllCategories = Category[];

export async function fetchAllCategories(): Promise<AllCategories> {
  return await db.category.findMany({ orderBy: { name: "asc" } });
}

export async function fetchMenCategories(): Promise<AllCategories> {
  return await db.category.findMany({
    where: { sex: "homme" },
    orderBy: { name: "asc" },
  });
}

export async function fetchWomenCategories(): Promise<AllCategories> {
  return await db.category.findMany({
    where: { sex: "femme" },
    orderBy: { name: "asc" },
  });
}
