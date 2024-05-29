"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductVariantRow from "./ProductVariantRow";
import * as actions from "@/actions";
import { ProductWithVariants } from "@/db/queries/product";
import { getVariantsByColor } from "@/db/queries/variants";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

type ProductVariantsProps =
  | {
      type: "edit";
      product: ProductWithVariants;
    }
  | { type: "add"; product?: never };

function ProductVariants({ product, type }: ProductVariantsProps) {
  const [addFormState, addFormAction] = useFormState(
    actions.addVariants.bind(null, product?.id),
    {}
  );
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const variantsByColor =
    type === "edit" ? getVariantsByColor(product.variants) : [];

  useEffect(() => {
    if (!addFormState.success && addFormState?.errors?._form) {
      toast.error(addFormState?.errors._form?.join(", "));
    }
    if (addFormState.success) {
      toast.success("La variante a été ajoutée");
    }
  }, [addFormState]);

  if (!product) return null;

  function handleActiveRow(rowNumber: number | null) {
    setActiveRow(rowNumber);
  }

  async function handleAddVariant(formData: FormData) {
    addFormAction(formData);
    handleActiveRow(0);
  }

  const content =
    Array.isArray(variantsByColor) && variantsByColor.length > 0
      ? variantsByColor.map((variant, idx) => (
          <ProductVariantRow
            key={variant.createdAt.getTime()}
            variant={variant}
            rowNumber={idx}
            activeRow={activeRow}
            handleActiveRow={handleActiveRow}
          />
        ))
      : null;

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <form>
        <Card>
          <CardHeader>
            <CardTitle>Variantes</CardTitle>
            <CardDescription>
              Gestion des stocks et des prix des variantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Couleur</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead hidden></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{content}</TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1"
              formAction={handleAddVariant}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Ajouter variante
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default ProductVariants;
