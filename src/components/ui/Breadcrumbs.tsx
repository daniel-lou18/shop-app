"use client";

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
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BreadcrumbsProps = {
  slug: [string | undefined, string | undefined, string | undefined];
  type?: "short" | "long";
};

export function Breadcrumbs({ slug, type = "short" }: BreadcrumbsProps) {
  const router = useRouter();
  const [first, category, last] = slug;

  let breadcrumbs =
    last || category ? (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={paths.storeSex(first || "femme")}>
              {capitalizeString(first)}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {type === "long" && category && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={paths.storeCategory(first || "femme", category)}>
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
    <Breadcrumb className="mb-6 flex items-center gap-4">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Retourner</span>
      </Button>
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
