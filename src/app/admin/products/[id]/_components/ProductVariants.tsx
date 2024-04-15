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
import { EditData, VariantByColor } from "../page";
import ProductVariantSizes from "./ProductVariantSizes";
import { useState } from "react";
import * as actions from "@/actions";

function ProductVariants({ data }: { data: EditData | null }) {
  const { toast } = useToast();
  const [currentVariants, setCurrentVariants] = useState<VariantByColor[]>(
    data?.variantsByColor || []
  );

  if (data && data.variants === null) {
    toast({
      variant: "red",
      description: `🚨 Erreur lors du chargement des variantes`,
    });
    return null;
  }
  if (data?.variants && "error" in data.variants) {
    toast({
      variant: "red",
      description: `🚨 ${data.variants.error}`,
    });
    return null;
  }

  function handleAddVariant() {
    setCurrentVariants([
      ...currentVariants,
      {
        color: "",
        imagePath: null,
        price: data?.product?.price || 0,
        _sum: { stockQuantity: 0 },
      },
    ]);
  }

  return (
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
              {Array.isArray(currentVariants) &&
                currentVariants?.length > 0 &&
                currentVariants.map((variant) => (
                  <ProductVariantRow
                    key={variant.color}
                    variant={variant}
                    variants={data.variants}
                  >
                    <ProductVariantSizes
                      variants={
                        Array.isArray(data?.variants) &&
                        data.variants?.filter(
                          (item) => item.color === variant.color
                        )
                      }
                    />
                  </ProductVariantRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="gap-1"
            onClick={handleAddVariant}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Ajouter variante
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default ProductVariants;
