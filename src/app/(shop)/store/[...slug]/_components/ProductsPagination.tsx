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
import { Dispatch, SetStateAction } from "react";

type ProductsPaginationProps = {
  take: number;
  totalItems: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

function ProductsPagination({
  take,
  totalItems,
  setIsLoading,
}: ProductsPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page") || 1);
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / take);

  function handleClick(type: "prev" | "next" | number) {
    if (
      (type === "prev" && currentPage === 1) ||
      (type === "next" && currentPage === totalPages)
    )
      return;
    setIsLoading(true);
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
          if (
            (idx <= currentPage && idx >= currentPage - 2) ||
            (currentPage === totalPages - 3 && idx === totalPages - 2) ||
            (currentPage === 4 && idx === 1) ||
            idx === 0 ||
            idx === totalPages - 1
          ) {
            return (
              <PaginationItem
                key={idx}
                onClick={() => handleClick(idx + 1)}
                className={`${
                  currentPage !== idx + 1 ? "hidden" : ""
                } md:inline`}
              >
                <PaginationLink href="#" isActive={currentPage === idx + 1}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (
            idx === 1 ||
            (idx === totalPages - 2 && currentPage !== totalPages)
          ) {
            return (
              <PaginationItem key={idx} className="hidden md:inline">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
        })}
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
