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
import { useToast } from "@/components/ui/use-toast";
import ProductVariantRow from "./ProductVariantRow";
import { EditData } from "../page";
import * as actions from "@/actions";
import { ProductVariant } from "@prisma/client";
import { ProductVariantsByColor } from "@/db/queries/variants";

type ProductVariantsProps = {
  variantsByColor: ProductVariantsByColor | null;
};

function ProductVariants({ variantsByColor }: ProductVariantsProps) {
  const { toast } = useToast();

  if (!variantsByColor) {
    toast({
      variant: "red",
      description: `🚨 Erreur lors du chargement des variantes`,
    });
    return null;
  }
  if (variantsByColor && "error" in variantsByColor) {
    toast({
      variant: "red",
      description: `🚨 ${variantsByColor.error}`,
    });
    return null;
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
      <form action={actions.editVariants}>
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
              <TableBody>
                {Array.isArray(variantsByColor) &&
                  variantsByColor.length > 0 &&
                  variantsByColor.map((variant) => (
                    <ProductVariantRow
                      key={variant.color}
                      variant={variant}
                      variants={variant.variants}
                    />
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1"
              formAction={actions.addVariants}
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
