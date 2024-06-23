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
import { VariantsWithProduct } from "@/db/queries/variants";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import ProductImages from "./ProductImages";
import { useSearchParams } from "next/navigation";

type ProductVariantFormProps = {
  variants: VariantsWithProduct;
};

function ProductVariantForm({ variants }: ProductVariantFormProps) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string>(
    searchParams.get("color") || variants.at(0)!.color || ""
  );
  const [availableSizes, setAvailableSizes] = useState<ProductVariant[]>(
    variants.filter((variant) => variant.color === selectedColor) || []
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCart();

  function handleColorChange(value: string) {
    if (value) {
      setSelectedColor(value);
      const colorVariants = variants.filter(
        (variant) => variant.color === value
      );
      if (colorVariants) {
        setAvailableSizes([...colorVariants]);
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
    const selectedVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
    selectedVariant && addItem({ ...selectedVariant });
    toast({
      variant: "green",
      description: "Le produit a été ajouté à votre panier",
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
      <ProductImages availableSizes={availableSizes} />
      <Card className="border-0 shadow-none flex-1 col-span-3">
        <CardHeader className="p-0">
          <CardTitle>
            {variants.at(0)?.product.brand.name.toUpperCase()}
          </CardTitle>
          <h1 className="text-2xl font-bold">{variants.at(0)?.product.name}</h1>
        </CardHeader>
        <CardContent className="px-0 py-4 grid grid-cols-1 gap-4">
          <p className="text-xl text-gray-950 font-semibold">
            {centsToEuros(availableSizes.at(0)?.price || 0)}
          </p>
          <ProductColors
            value={selectedColor}
            onValueChange={handleColorChange}
            variants={variants}
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
          <ProductDescription
            productDescription={variants.at(0)?.product.description}
          />
          <ProductAccordeon />
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductVariantForm;
