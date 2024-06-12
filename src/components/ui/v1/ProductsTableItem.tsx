import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../badge";
import { Button } from "../button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductVariant } from "@prisma/client";
import ProductsTableItemDelete from "./ProductsTableItemDelete";
import { centsToEuros } from "@/helpers/helpers";
import { ProductWithData } from "@/db/queries/products";
import { Suspense } from "react";

export type ProductsTableItemProps = ProductWithData & {
  variants: ProductVariant[];
  totalStock: number;
};

function getStatus(isActive: boolean, isArchived: boolean) {
  switch (isActive + "-" + isArchived) {
    case "true-false":
      return "actif";
    case "false-true":
      return "archivé";
    case "false-false":
      return "brouillon";
    default:
      return "brouillon";
  }
}

function ProductsTableItem({
  id,
  name,
  brand,
  category,
  price,
  totalStock,
  variants,
  isActive,
  isArchived,
}: ProductsTableItemProps) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={variants.at(0)?.imagePath || "/placeholder.svg"}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{brand.name}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <Badge
          variant={`${isActive || !isArchived ? "outline" : "secondary"}`}
          className={`${isActive ? "bg-green-200" : ""}`}
        >
          {getStatus(isActive, isArchived)}
        </Badge>
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        {centsToEuros(price)}
      </TableCell>
      <TableCell className="hidden xl:table-cell">{totalStock}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${id}`}>Modifier</Link>
            </DropdownMenuItem>
            <Suspense>
              <ProductsTableItemDelete id={id} />
            </Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default ProductsTableItem;
