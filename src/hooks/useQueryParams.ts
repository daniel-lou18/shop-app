import { parsePathParams } from "@/lib/parsers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const searchParams = useSearchParams();
  const path = usePathname();
  const params = parsePathParams(path);
  const router = useRouter();

  return { searchParams, path, params, router };
}
