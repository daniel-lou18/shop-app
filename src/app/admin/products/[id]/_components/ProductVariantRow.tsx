"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductVariant } from "@prisma/client";
import { centsToEuros } from "@/helpers/helpers";
import { useEffect, useRef, useState } from "react";
import ProductVariantEditImage from "./ProductVariantEditImage";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Pencil, Save, Trash2 } from "lucide-react";
import * as actions from "@/actions";
import ProductVariantSizes from "./ProductVariantSizes";

type ProductVariantRowProps = {
  variant: {
    color: string;
    imagePath: string | null;
    price: number;
    totalStock: number;
  };
  variants: ProductVariant[] | null;
};

function ProductVariantRow({ variant, variants }: ProductVariantRowProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const sameColoredVariants = variants?.filter(
    (item) => item.color === variant.color
  );

  useEffect(() => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  }, [isDisabled]);

  function handleEdit() {
    setIsDisabled(false);
  }

  function handleCancel() {
    setIsDisabled(true);
  }

  async function handleSave(formData: FormData) {
    setIsDisabled(true);
    await actions.editVariants(formData);
  }

  return (
    <TableRow>
      <ProductVariantEditImage
        variants={Array.isArray(sameColoredVariants) && sameColoredVariants}
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
          defaultValue={variant.totalStock || ""}
          disabled={isDisabled}
          readOnly
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
      <ProductVariantSizes
        variants={Array.isArray(sameColoredVariants) && sameColoredVariants}
      />
      <TableCell>
        <div className="flex gap-2">
          {isDisabled ? (
            <Button variant="outline" onClick={handleEdit}>
              <Pencil size={16} strokeWidth={1.5} />
            </Button>
          ) : (
            <Button variant="outline" onClick={handleCancel}>
              <ChevronLeft size={16} strokeWidth={1.5} />
            </Button>
          )}
          {isDisabled ? (
            <Button variant="outline" formAction={actions.deleteVariants}>
              <Trash2 size={16} strokeWidth={1.5} />
            </Button>
          ) : (
            <Button variant="outline" formAction={handleSave}>
              <Save size={16} strokeWidth={1.5} />
            </Button>
          )}
        </div>
      </TableCell>
      <TableCell hidden>
        <input
          readOnly
          hidden
          name="productId"
          value={variants?.at(0)?.productId}
        />
        <input
          readOnly
          hidden
          name="variantIds"
          value={sameColoredVariants?.map((variant) => variant.id)}
        />
      </TableCell>
    </TableRow>
  );
}

export default ProductVariantRow;
