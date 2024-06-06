import { fetchAllProductsWithTotalStock } from "@/db/queries/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    const result = await fetchAllProductsWithTotalStock({
      ...searchParamsObject,
    });
    if (!result.success) throw new Error(result.error);
    if (result.success) return NextResponse.json(result.data, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    let errorMessage;
    if (err instanceof Error) errorMessage = err.message;
    else errorMessage = "Une erreur est survenue";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
