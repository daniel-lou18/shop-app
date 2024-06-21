"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { centsToEuros } from "@/helpers/helpers";
import { ProductVariant } from "@prisma/client";
import { useState } from "react";
import ProductSizes from "./ProductSizes";
import ProductColors from "./ProductColors";
import ProductDescription from "./ProductDescription";
import ProductAccordeon from "./ProductAccordeon";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import { ProductVariantsByColor } from "@/db/queries/variants";
import { ProductWithVariants } from "@/db/queries/product";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import ProductImages from "./ProductImages";

type ProductVariantFormProps = {
  result: ProductWithVariants;
  variantsByColor: ProductVariantsByColor;
};

function ProductVariantForm({
  result,
  variantsByColor,
}: ProductVariantFormProps) {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string>(
    variantsByColor.at(0)!.color || ""
  );
  const [availableSizes, setAvailableSizes] = useState<ProductVariant[]>(
    variantsByColor.at(0)!.variants || []
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCart();

  function handleColorChange(value: string) {
    if (value) {
      setSelectedColor(value);
      const colorVariant = variantsByColor.find(
        (variant) => variant.color === value
      );
      if (colorVariant?.variants) {
        setAvailableSizes([...colorVariant.variants]);
      }
      setSelectedSize("");
    }
  }

  function handleSizeChange(value: string) {
    if (value) {
      setSelectedSize(value);
    }
  }

  function handleAddToCart() {
    if (!selectedColor || !selectedSize) {
      return toast({
        variant: "red",
        description: "Veuillez choisir une couleur et une taille",
      });
    }
    const selectedVariantColor = variantsByColor.find(
      (variant) => variant.color === selectedColor
    );
    const selectedVariant = selectedVariantColor?.variants?.find(
      (variant) => variant.size === selectedSize
    );
    selectedVariant && addItem({ ...selectedVariant, product: result });
    toast({
      variant: "green",
      description: "Le produit a été ajouté à votre panier",
    });
  }

  return (
    <div className="p-4 md:px-0 md:py-8 grid grid-cols-1 md:grid-cols-5 gap-12 max-w-7xl mx-auto">
      <ProductImages availableSizes={availableSizes} />
      <Card className="border-0 shadow-none flex-1 col-span-2">
        <CardHeader className="p-0">
          <CardTitle>{result.brand.name}</CardTitle>
          <h1 className="text-2xl font-bold">{result.name}</h1>
        </CardHeader>
        <CardContent className="px-0 py-4 grid grid-cols-1 gap-4">
          <p className="text-xl text-gray-950 font-semibold">
            {centsToEuros(availableSizes.at(0)?.price || 0)}
          </p>
          <ProductColors
            value={selectedColor}
            onValueChange={handleColorChange}
            variantsByColor={variantsByColor}
          />
          <ProductSizes
            value={selectedSize}
            onValueChange={handleSizeChange}
            availableSizes={availableSizes}
          />
        </CardContent>
        <CardFooter className="flex-col items-start px-0 py-4 gap-8">
          <ButtonSubmit
            size="lg"
            className="w-full text-lg"
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </ButtonSubmit>
          <ProductDescription productDescription={result.description} />
          <ProductAccordeon />
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductVariantForm;
