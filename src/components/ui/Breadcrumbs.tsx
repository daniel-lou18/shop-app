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

export function Breadcrumbs({ slug }: { slug: Slug }) {
  const [sex, category, brand] = slug;

  let breadcrumbs =
    brand || category ? (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={paths.storeSex(sex)}>{capitalizeString(sex)}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
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
            {capitalizeString(decodeURIComponent(brand || "")) ||
              capitalizeString(decodeURIComponent(category || "")) ||
              capitalizeString(sex)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
