import { db } from "@/db";
import { Category } from "@prisma/client";

type AllCategories = Category[];

export async function fetchAllCategories(): Promise<AllCategories> {
  return await db.category.findMany({ orderBy: { name: "asc" } });
}
