import { searchVariantsWithProduct } from "@/db/queries/variants";
import { parseApiParams, parseApiSearchParams } from "@/lib/parsers";
import { Slug } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const parsedParams = parseApiParams(pathname) as Slug;
  const parsedSearchParams = parseApiSearchParams(searchParams);

  const result = await searchVariantsWithProduct(
    parsedParams,
    parsedSearchParams
  );
  if (result.success) return NextResponse.json(result.data, { status: 200 });
  else
    return NextResponse.json(
      { error: result.error },
      {
        status: 500,
      }
    );
}
