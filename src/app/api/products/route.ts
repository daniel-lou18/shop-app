import { fetchProductsWithSearchParams } from "@/db/queries/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const products = await fetchProductsWithSearchParams(
    Object.fromEntries(searchParams.entries())
  );
  return new Response(JSON.stringify({ products }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
