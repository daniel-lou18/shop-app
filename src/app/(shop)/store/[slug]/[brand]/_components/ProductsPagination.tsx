"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductsPaginationProps = {
  take: number;
  totalItems: number;
};

function ProductsPagination({ take, totalItems }: ProductsPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page") || 1)
  );
  console.log(currentPage);
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / take);

  function handleClick(type: "prev" | "next" | number) {
    const newQueryString = new URLSearchParams(searchParams);
    let newValue = 1;
    if (type === "prev") {
      if (currentPage > 1) newValue = currentPage - 1;
      else newValue = currentPage;
    }
    if (type === "next") {
      if (currentPage < totalPages) newValue = currentPage + 1;
      else newValue = currentPage;
    }
    if (typeof type === "number") {
      newValue = type;
    }
    newQueryString.set("page", newValue.toString());
    setCurrentPage(newValue);
    router.push(`${pathname}?${newQueryString.toString()}`);
  }

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem onClick={() => handleClick("prev")}>
          <PaginationPrevious
            href=""
            className={currentPage > 1 ? "" : "opacity-30 pointer-events-none"}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, idx) => {
          return (
            <PaginationItem key={idx} onClick={() => handleClick(idx + 1)}>
              <PaginationLink href="#" isActive={currentPage === idx + 1}>
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem onClick={() => handleClick("next")}>
          <PaginationNext
            href=""
            className={
              currentPage < totalPages ? "" : "opacity-30 pointer-events-none"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ProductsPagination;