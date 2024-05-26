"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";
import ProductVariantEditImage from "./ProductVariantEditImage";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Save, Trash2, X } from "lucide-react";
import * as actions from "@/actions";
import ProductVariantSizes from "./ProductVariantSizes";
import { ProductVariantByColor } from "@/db/queries/variants";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import FormFieldError from "@/components/ui/FormFieldError";

type ProductVariantRowProps = {
  variant: ProductVariantByColor;
  rowNumber: number;
  activeRow: number | null;
  handleActiveRow: (rowNumber: number | null) => void;
};

function ProductVariantRow({
  variant,
  rowNumber,
  activeRow,
  handleActiveRow,
}: ProductVariantRowProps) {
  const [editFormState, editFormAction] = useFormState(
    actions.editVariants.bind(
      null,
      variant.variants.at(0)?.productId,
      variant.variants.map((variant) => variant.id)
    ),
    {}
  );
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();
  const inputRef = useRef<HTMLInputElement>(null);
  const isActive = rowNumber !== activeRow;
  const isDisabled =
    activeRow !== null && rowNumber !== activeRow ? true : false;

  useEffect(() => {
    if (!isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (editFormState?.errors?._form) {
      toast.error(editFormState.errors._form?.join(", "));
    }
    if (
      !editFormState?.errors &&
      searchParams.get("edit-variant") === "success"
    ) {
      toast.success("La variante a été mise à jour");
    }
  }, [editFormState, searchParams]);

  if (!variant) {
    return null;
  }

  function handleEdit() {
    handleActiveRow(rowNumber);
  }

  function handleCancel() {
    inputRef.current && (inputRef.current.value = variant.color);
    handleActiveRow(null);
  }

  const handleDelete = actions.deleteVariants.bind(
    null,
    variant.variants.at(0)?.productId,
    variant.variants.map((variant) => variant.id)
  );

  async function editVariantsAndDisable(formData: FormData) {
    handleActiveRow(null);
    editFormAction(formData);
  }

  return (
    <TableRow>
      <ProductVariantEditImage
        variants={Array.isArray(variant.variants) && variant.variants}
      />
      <TableCell>
        <Label
          htmlFor={`color-${variant.variants.at(0)?.id}`}
          className="sr-only"
        >
          Couleur
        </Label>
        <Input
          id={`color-${variant.variants.at(0)?.id}`}
          name="variantColor"
          type="text"
          defaultValue={variant.color}
          disabled={isActive}
          ref={inputRef}
        />
        <FormFieldError>{editFormState?.errors?.variantColor}</FormFieldError>
      </TableCell>
      <TableCell>
        <Label
          htmlFor={`stock-${variant.variants.at(0)?.id}`}
          className="sr-only"
        >
          Stock
        </Label>
        <Input
          id={`stock-${variant.variants.at(0)?.id}`}
          type="number"
          defaultValue={variant.totalStock || ""}
          disabled={isActive}
          readOnly
        />
      </TableCell>
      <TableCell>
        <Label
          htmlFor={`price-${variant.variants.at(0)?.id}`}
          className="sr-only"
        >
          Price
        </Label>
        <Input
          id={`price-${variant.variants.at(0)?.id}`}
          name="variantPrice"
          type="number"
          defaultValue={variant.price}
          disabled={isActive}
        />
        <FormFieldError>{editFormState?.errors?.variantPrice}</FormFieldError>
      </TableCell>
      <ProductVariantSizes
        variants={Array.isArray(variant.variants) && variant.variants}
      />
      <TableCell>
        <div className="flex gap-2">
          {isActive && (
            <>
              <Button
                variant="outline"
                onClick={handleEdit}
                type="button"
                disabled={isDisabled}
              >
                <Pencil size={16} strokeWidth={1.5} />
              </Button>

              <Button
                variant="outline"
                formAction={handleDelete}
                disabled={isDisabled}
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </Button>
            </>
          )}
          {!isActive && (
            <>
              <Button variant="outline" formAction={editVariantsAndDisable}>
                {!pending && <Save size={16} strokeWidth={1.5} />}
                {pending && <Loader2 className="size-4 animate-spin" />}
              </Button>
              <Button variant="outline" onClick={handleCancel} type="button">
                <X size={16} strokeWidth={1.5} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProductVariantRow;
