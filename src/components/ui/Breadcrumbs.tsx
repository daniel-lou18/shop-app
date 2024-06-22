import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slug } from "@/types";
import { capitalizeString } from "@/lib/parsers";
import { paths } from "@/lib/paths";

type BreadcrumbsProps = {
  slug: [string, string, string];
  type?: "short" | "long";
};

export function Breadcrumbs({ slug, type = "short" }: BreadcrumbsProps) {
  const [first, category, last] = slug;

  let breadcrumbs =
    last || category ? (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={paths.storeSex(first)}>{capitalizeString(first)}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {type === "long" && category && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink>
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
          <BreadcrumbLink>
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
