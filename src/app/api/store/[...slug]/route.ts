import { searchVariantsWithProduct } from "@/db/queries/variants";
import { parseApiSearchParams } from "@/lib/parsers";
import { Slug } from "@/types";
import { NextRequest, NextResponse } from "next/server";

/*This is the API route handler that handles the filtering of variants.
 * It receives the dynamic catch-all segments [...slug] route parameters, for example: ['femme', 'brandstore', 'Maje'].
 * It also receives search params from the URL and parses them.
 * It then calls a query function that gets the filtered variants from the database.
 */

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: Slug } }
) {
  const { searchParams } = request.nextUrl;
  const parsedSearchParams = parseApiSearchParams(searchParams);

  try {
    const result = await searchVariantsWithProduct(slug, parsedSearchParams);
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
