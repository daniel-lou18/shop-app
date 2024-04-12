"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { centsToEuros } from "@/helpers/helpers";
import ButtonSubmit from "../../../../../components/ui/ButtonSubmit";
import Image from "next/image";
import { Brand, Product, ProductVariant } from "@prisma/client";
import { useState } from "react";

type ProductCardFormProps = {
  variantsByColor:
    | {
        color: string;
        imagePath: string | null;
        variants: ProductVariant[];
      }[]
    | undefined;
};

function ProductCardForm({ variantsByColor }: ProductCardFormProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    variantsByColor?.at(0)?.color || ""
  );
  const [availableSizes, setAvailableSizes] = useState<ProductVariant[]>(
    variantsByColor?.at(0)?.variants || []
  );
  const [selectedSize, setSelectedSize] = useState<string>("");

  console.log(selectedColor, selectedSize, availableSizes);

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
    <>
      <CardContent className="px-0 py-4 grid grid-cols-1 gap-4">
        <p className="text-xl text-gray-950 font-semibold">
          {/* {result?.price && centsToEuros(result.price)} */}
        </p>
        <div className="grid grid-cols-1 gap-2">
          <p>{`${variantsByColor?.length} Couleurs disponibles`}</p>
          <ToggleGroup
            type="single"
            variant="default"
            className="gap-4 justify-start"
            value={selectedColor}
            onValueChange={handleColorChange}
          >
            {variantsByColor?.map((variant) => (
              <ToggleGroupItem
                value={variant.color}
                key={variant.color}
                className={`p-0 overflow-hidden w-20 h-20 hover:outline hover:outline-2 hover:outline-primary-dark ${
                  variant.color === selectedColor
                    ? "outline-none ring-2 ring-ring ring-offset-2"
                    : ""
                }`}
              >
                <Image
                  alt="Product image"
                  className="aspect-square w-full object-cover"
                  height="150"
                  src={variant.imagePath || "/placeholder.svg"}
                  width="150"
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <p>Votre taille</p>
          <ToggleGroup
            type="single"
            variant="outline"
            className="gap-4 justify-start"
            value={selectedSize}
            onValueChange={handleSizeChange}
          >
            {availableSizes.map((item) => (
              <ToggleGroupItem
                value={item.size}
                key={item.id}
                className="w-16"
                disabled={item.stockQuantity === 0}
              >
                {item.size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
        <ButtonSubmit size="lg" className="w-full text-lg">
          Ajouter au panier
        </ButtonSubmit>
      </CardFooter>
    </>
  );
}

export default ProductCardForm;
