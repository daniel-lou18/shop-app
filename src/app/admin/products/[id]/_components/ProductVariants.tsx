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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import ProductVariantTrigger from "./ProductVariantTrigger";
import { EditData } from "../page";
import ProductVariantPopover from "./ProductVariantPopover";

function ProductVariants({ data }: { data: EditData | null }) {
  const { toast } = useToast();
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

  return (
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
              <TableHead>Couleur</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data?.variantsByColor) &&
              data.variantsByColor.length > 0 &&
              data.variantsByColor.map((variant) => (
                <ProductVariantTrigger key={variant.color} variant={variant}>
                  <ProductVariantPopover
                    variants={
                      Array.isArray(data?.variants) &&
                      data.variants?.filter(
                        (item) => item.color === variant.color
                      )
                    }
                  />
                </ProductVariantTrigger>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button type="button" size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductVariants;
