import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

type ProductVariantPopoverProps = {
  variants:
    | ProductVariant[]
    | {
        error: string;
      }
    | null
    | false;
};

function ProductVariantPopover({ variants }: ProductVariantPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Tailles</Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="min-w-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead className="w-[20%]">Taille</TableHead>
              <TableHead className="w-[25%]">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(variants) &&
              variants.length > 0 &&
              variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <Label htmlFor="sku-2" className="sr-only">
                      SKU
                    </Label>
                    <Input id="sku-2" type="text" defaultValue={variant.sku} />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-2" className="sr-only">
                      Price
                    </Label>
                    <Input
                      id="size-2"
                      type="text"
                      defaultValue={variant.size}
                    />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="stock-2" className="sr-only">
                      Stock
                    </Label>
                    <Input
                      id="stock-2"
                      type="number"
                      defaultValue={variant.stockQuantity || ""}
                      disabled
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}

export default ProductVariantPopover;
