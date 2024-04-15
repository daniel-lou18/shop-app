"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductVariant } from "@prisma/client";
import { centsToEuros } from "@/helpers/helpers";
import { ReactNode, useEffect, useRef, useState } from "react";
import ProductVariantEditImage from "./ProductVariantEditImage";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Pencil, Save } from "lucide-react";

type ProductVariantRowProps = {
  children: ReactNode;
  variant: {
    color: string;
    imagePath: string | null;
    price: number;
    _sum: { stockQuantity: number | null };
  };
  variants: ProductVariant[] | null;
};

function ProductVariantRow({
  children,
  variant,
  variants,
}: ProductVariantRowProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  }, [isDisabled]);

  function handleEdit() {
    setIsDisabled((prev) => !prev);
  }
  return (
    <TableRow>
      <ProductVariantEditImage
        variants={
          Array.isArray(variants) &&
          variants?.filter((item) => item.color === variant.color)
        }
      />
      <TableCell>
        <Label htmlFor="variantColor" className="sr-only">
          Couleur
        </Label>
        <Input
          id="variantColor"
          name="variantColor"
          type="text"
          defaultValue={variant.color}
          disabled={isDisabled}
          ref={inputRef}
        />
      </TableCell>
      <TableCell>
        <Label htmlFor="variantTotalStock" className="sr-only">
          Stock
        </Label>
        <Input
          id="variantTotalStock"
          type="number"
          defaultValue={variant._sum.stockQuantity || ""}
          disabled
        />
      </TableCell>
      <TableCell>
        <Label htmlFor="variantPrice" className="sr-only">
          Price
        </Label>
        <Input
          id="variantPrice"
          name="variantPrice"
          type="text"
          defaultValue={centsToEuros(variant.price)}
          disabled={isDisabled}
        />
      </TableCell>
      {children}
      <TableCell>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleEdit}>
            {isDisabled ? (
              <Pencil size={16} strokeWidth={1.5} />
            ) : (
              <ChevronLeft size={16} strokeWidth={1.5} />
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleEdit}
            disabled={isDisabled}
          >
            <Save size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductVariantRow;
