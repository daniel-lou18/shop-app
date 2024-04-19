"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { centsToEuros } from "@/helpers/helpers";
import ButtonSubmit from "../../../../../components/ui/ButtonSubmit";
import { ProductVariant } from "@prisma/client";
import { useState } from "react";
import ProductSizes from "./ProductSizes";
import ProductColors from "./ProductColors";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";

type ProductVariantFormProps = {
  brandName: string | null;
  productName: string | null;
  productDescription: string | null;
  variantsByColor:
    | {
        color: string;
        imagePath: string | null;
        variants: ProductVariant[];
      }[]
    | undefined;
};

function ProductVariantForm({
  variantsByColor,
  brandName,
  productName,
  productDescription,
}: ProductVariantFormProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    variantsByColor?.at(0)?.color || ""
  );
  const [availableSizes, setAvailableSizes] = useState<ProductVariant[]>(
    variantsByColor?.at(0)?.variants || []
  );
  const [selectedSize, setSelectedSize] = useState<string>("");

  function handleColorChange(value: string) {
    if (value) {
      setSelectedColor(value);
      const colorVariant = variantsByColor?.find(
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

  return (
    <div className="grid grid-cols-2 gap-12">
      <ProductImage image={availableSizes.at(0)?.imagePath || null} />
      <Card className="border-0 shadow-none flex-1">
        <CardHeader className="p-0">
          <CardTitle>{brandName}</CardTitle>
          <h1 className="text-2xl font-bold">{productName}</h1>
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
          <ButtonSubmit size="lg" className="w-full text-lg">
            Ajouter au panier
          </ButtonSubmit>
          <ProductDescription productDescription={productDescription} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductVariantForm;
