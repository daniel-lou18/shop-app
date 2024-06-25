import { searchVariantsWithProduct } from "@/db/queries/variants";
import { parseApiParams, parseApiSearchParams } from "@/lib/parsers";
import { Slug } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const parsedParams = parseApiParams(pathname) as Slug;
  const parsedSearchParams = parseApiSearchParams(searchParams);

  try {
    const result = await searchVariantsWithProduct(
      parsedParams,
      parsedSearchParams
    );
    if (!result.success) {
      throw new Error(result.error);
    }
    return NextResponse.json(result.data, { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la requête GET :", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur interne serveur" },
      {
        status: 500,
      }
    );
  }
}
