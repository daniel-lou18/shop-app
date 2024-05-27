"use client";

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
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import * as actions from "@/actions";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import FormFieldError from "@/components/ui/FormFieldError";
import { toast } from "sonner";

type ProductVariantSizesProps = {
  variants:
    | ProductVariant[]
    | {
        error: string;
      }
    | null
    | false;
};

function ProductVariantSizes({ variants }: ProductVariantSizesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formState, action] = useFormState(actions.editSizes, {});

  useEffect(() => {
    if (formState.success) {
      toast.success("Les tailles ont été mises à jour");
      setIsOpen(false);
    }
    if (formState.errors) {
      toast.error(formState.errors._form?.join(", "));
    }
  }, [formState]);

  return (
    <TableCell>
      <Popover open={isOpen} onOpenChange={setIsOpen} modal>
        <PopoverTrigger asChild>
          <Button variant="outline" className="font-semibold">
            Tailles
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="min-w-[500px]">
          <form action={action}>
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
                        <Label
                          htmlFor={`sku-${variant.id}`}
                          className="sr-only"
                        >
                          SKU
                        </Label>
                        <Input
                          id={`sku-${variant.id}`}
                          name={`sku-${variant.id}`}
                          type="text"
                          defaultValue={variant.sku}
                        />
                      </TableCell>
                      <TableCell>
                        <Label
                          htmlFor={`size-${variant.id}`}
                          className="sr-only"
                        >
                          Taille
                        </Label>
                        <Input
                          id={`size-${variant.id}`}
                          name={`size-${variant.id}`}
                          type="text"
                          defaultValue={variant.size}
                        />
                      </TableCell>
                      <TableCell>
                        <Label
                          htmlFor={`stockQuantity-${variant.id}`}
                          className="sr-only"
                        >
                          Stock
                        </Label>
                        <Input
                          id={`stockQuantity-${variant.id}`}
                          name={`stockQuantity-${variant.id}`}
                          type="number"
                          defaultValue={variant.stockQuantity || ""}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="items-center justify-end gap-2 md:ml-auto flex mt-2">
              <PopoverClose asChild>
                <Button type="button" variant="outline" size="sm">
                  Annuler
                </Button>
              </PopoverClose>
              <ButtonSubmit>Sauvegarder</ButtonSubmit>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </TableCell>
  );
}

export default ProductVariantSizes;
