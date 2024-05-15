import { fetchProductsWithSearchParams } from "@/db/queries/products";
import { parseApiParams, parseApiSearchParams } from "@/lib/parsers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const parsedParams = parseApiParams(pathname);
  const parsedSearchParams = parseApiSearchParams(searchParams);

  const result = await fetchProductsWithSearchParams(
    parsedParams,
    parsedSearchParams
  );
  if (result.success)
    return new Response(JSON.stringify(result.data), { status: 200 });
  else
    return new Response(JSON.stringify({ error: result.error }), {
      status: 500,
    });
}
