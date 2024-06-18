"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/helpers/helpers";
import { useState } from "react";
import ProductSizes from "./ProductSizes";
import ProductColors from "./ProductColors";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import ProductAccordeon from "./ProductAccordeon";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import { ShopifyProduct } from "@/types";

type ProductVariantFormProps = {
  result: ShopifyProduct;
};

function getUniqueValues(result: ShopifyProduct, optionsIdx: number) {
  return Array.from(
    new Set(
      result.variants?.nodes.map(
        (item) => item.selectedOptions[optionsIdx]?.value
      )
    )
  );
}

function getSelectedImage(result: ShopifyProduct, selectedColor: string) {
  const selectedVariant = result.variants.nodes.find((item) =>
    item.selectedOptions[1]?.value.includes(selectedColor)
  );
  const imageUrl = selectedVariant?.image?.url;
  return imageUrl;
}

function ProductVariantForm({ result }: ProductVariantFormProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(
    result.variants?.nodes[0]?.selectedOptions[1]?.value || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const uniqueSizes = getUniqueValues(result, 0) || [];
  const uniqueColors = getUniqueValues(result, 1) || [];

  function handleColorChange(value: string) {
    if (value) {
      setSelectedColor(value);
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
        description: "Veuillez sélectionner une couleur et une taille",
      });
    }
    const selectedVariant = result.variants.nodes?.find(
      (item) => item.title === `${selectedSize} / ${selectedColor}`
    );
    selectedVariant && addItem(selectedVariant);
    toast({
      variant: "green",
      description: "Le produit a été ajouté à votre panier",
    });
  }

  return (
    <div className="p-4 md:p-0 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
      <ProductImage image={getSelectedImage(result, selectedColor) || null} />
      <Card className="border-0 shadow-none flex-1">
        <CardHeader className="p-0">
          <CardTitle>{result.vendor}</CardTitle>
          <h1 className="text-2xl font-bold">{result.title}</h1>
        </CardHeader>
        <CardContent className="px-0 py-4 grid grid-cols-1 gap-4">
          <p className="text-xl text-gray-950 font-semibold">
            {formatPrice(result.priceRangeV2.minVariantPrice.amount)}
          </p>
          <ProductColors
            value={selectedColor}
            onValueChange={handleColorChange}
            uniqueColors={uniqueColors}
            variants={result.variants.nodes}
          />
          <ProductSizes
            value={selectedSize}
            onValueChange={handleSizeChange}
            uniqueSizes={uniqueSizes}
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
