import { fetchProductsWithSearchParams } from "@/db/queries/products";
import { parseApiParams, parseApiSearchParams } from "@/helpers/helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const parsedParams = parseApiParams(pathname);
  const parsedSearchParams = parseApiSearchParams(searchParams);

  try {
    const products = await fetchProductsWithSearchParams(
      parsedParams,
      parsedSearchParams
    );
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
