"use client";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import TableDropdown from "./TableDropdown";

type TableActionsProps = {
  checkboxItems: { value: string; text: string }[];
  buttonText: string;
};

function TableActions({ checkboxItems, buttonText }: TableActionsProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("create") === "success") {
      toast.success("Le produit a été créé");
    }
    if (searchParams.get("edit") === "success") {
      toast.success("Le produit a été mis à jour");
    }
    if (searchParams.get("delete") === "success") {
      toast.success("Le produit a été supprimé");
    }
  }, [searchParams]);

  return (
    <div className="ml-auto flex items-center gap-2">
      <TableDropdown>
        {checkboxItems.map((item) => (
          <DropdownMenuCheckboxItem key={item.value}>
            {item.text}
          </DropdownMenuCheckboxItem>
        ))}
      </TableDropdown>
      <Button size="sm" variant="outline" className="h-8 gap-1">
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Exporter
        </span>
      </Button>
      <Button size="sm" className="h-8 gap-1" asChild>
        <Link href="/admin/products/new">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {buttonText}
          </span>
        </Link>
      </Button>
    </div>
  );
}

export default TableActions;
