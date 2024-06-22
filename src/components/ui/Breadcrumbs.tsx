import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalizeString } from "@/lib/parsers";
import { paths } from "@/lib/paths";

type BreadcrumbsProps = {
  slug: [string, string | undefined, string | undefined];
  type?: "short" | "long";
};

export function Breadcrumbs({ slug, type = "short" }: BreadcrumbsProps) {
  const [first, category, last] = slug;

  let breadcrumbs =
    last || category ? (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={paths.storeSex(first)}>{capitalizeString(first)}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {type === "long" && category && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={paths.storeCategory(first, category)}>
                  {capitalizeString(decodeURIComponent(category || ""))}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
      </>
    ) : null;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={paths.customerHome()}>Accueil</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {capitalizeString(decodeURIComponent(last || "")) ||
              capitalizeString(decodeURIComponent(category || "")) ||
              capitalizeString(first)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
