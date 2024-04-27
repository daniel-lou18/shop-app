import { db } from "@/db";

export type Colors = { color: string }[];
export type Sizes = { size: string }[];

export async function fetchDistinctColors(): Promise<Colors> {
  return await db.productVariant.findMany({
    distinct: ["color"],
    select: { color: true },
  });
}

export async function fetchDistinctSizes(): Promise<Sizes> {
  return await db.productVariant.findMany({
    distinct: ["size"],
    select: { size: true },
  });
}
