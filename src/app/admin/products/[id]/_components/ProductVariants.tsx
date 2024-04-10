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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProductVariant } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import ProductDynamicSelect from "./ProductDynamicSelect";

function ProductVariants({
  variants,
}: {
  variants: ProductVariant[] | { error: string } | null | undefined;
}) {
  const { toast } = useToast();
  if (variants === null) {
    toast({
      variant: "red",
      description: `🚨 Erreur lors du chargement des variantes`,
    });
    return null;
  }
  if (variants && "error" in variants) {
    toast({
      variant: "red",
      description: `🚨 ${variants.error}`,
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
              <TableHead>SKU</TableHead>
              <TableHead>Couleur</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants &&
              variants.length > 0 &&
              variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell className="font-semibold text-xs">
                    {variant.sku}
                  </TableCell>
                  <TableCell>{variant.color}</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-2" className="sr-only">
                      Stock
                    </Label>
                    <Input
                      id="stock-2"
                      type="number"
                      defaultValue={variant.stockQuantity}
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-2" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-2" type="number" defaultValue="99.99" />
                  </TableCell>
                </TableRow>
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
