import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductVariant } from "@prisma/client";
import ProductsTableItemDelete from "./ProductsTableItemDelete";
import { centsToEuros } from "@/helpers/helpers";
import { ProductWithData } from "@/db/queries/products";

type ProductsTableItemProps = ProductWithData & {
  variants: ProductVariant[];
  totalStock: number;
};

function ProductsTableItem({
  id,
  name,
  brand,
  category,
  price,
  totalStock,
  variants,
  isAvailable,
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
        <Badge variant="outline">{isAvailable ? "Actif" : "Brouillon"}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {centsToEuros(price)}
      </TableCell>
      <TableCell className="hidden md:table-cell">{totalStock}</TableCell>
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
            <ProductsTableItemDelete id={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default ProductsTableItem;
