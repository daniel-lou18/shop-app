import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductVariant } from "@prisma/client";
import { centsToEuros } from "@/helpers/helpers";
import ProductVariantPopover from "./ProductVariantPopover";
import { ReactNode } from "react";

type ProductVariantTriggerProps = {
  color: string;
  imagePath: string | null;
  price: number;
  _sum: { stockQuantity: number | null };
};

function ProductVariantTrigger({
  children,
  variant,
}: {
  children: ReactNode;
  variant: ProductVariantTriggerProps;
}) {
  return (
    <TableRow>
      <TableCell>
        <Label htmlFor="stock-2" className="sr-only">
          Couleur
        </Label>
        <Input id="stock-2" type="text" defaultValue={variant.color} />
      </TableCell>
      <TableCell>
        <Label htmlFor="stock-2" className="sr-only">
          Stock
        </Label>
        <Input
          id="stock-2"
          type="number"
          defaultValue={variant._sum.stockQuantity || ""}
          disabled
        />
      </TableCell>
      <TableCell>
        <Label htmlFor="price-2" className="sr-only">
          Price
        </Label>
        <Input
          id="price-2"
          type="text"
          defaultValue={centsToEuros(variant.price)}
        />
      </TableCell>
      <TableCell>{children}</TableCell>
    </TableRow>
  );
}

export default ProductVariantTrigger;
