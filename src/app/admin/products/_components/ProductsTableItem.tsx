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
import { Brand, Category, Product } from "@prisma/client";
import ProductsTableItemDelete from "./ProductsTableItemDelete";

type ProductsTableItemProps = Product & { brand: Brand } & {
  category: Category;
};

function ProductsTableItem({
  id,
  name,
  imagePath,
  brand,
  category,
  price,
}: ProductsTableItemProps) {
  const image = imagePath.split(" ").at(0);
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={image || "/placeholder.svg"}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{brand.name}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <Badge variant="outline">Draft</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{price} €</TableCell>
      <TableCell className="hidden md:table-cell">25</TableCell>
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
