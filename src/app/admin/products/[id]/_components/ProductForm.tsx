"use client";

import ProductHeader from "./ProductHeader";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import { ProductWithStock } from "@/db/queries/product";
import { Brand, Category, ProductVariant } from "@prisma/client";
import { ProductVariantsByColor } from "@/db/queries/variants";
import ProductStatus from "./ProductStatus";
import { AddProductSchemaType } from "@/actions/add-product";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import * as actions from "@/actions";

export type ProductFormProps = { brands: Brand[]; categories: Category[] } & (
  | {
      type: "edit";
      product: ProductWithStock;
      variantsByColor: ProductVariantsByColor;
    }
  | {
      type: "add";
      product?: never;
      variantsByColor?: never;
    }
);
function ProductForm({
  type,
  product,
  brands,
  categories,
  variantsByColor,
}: ProductFormProps) {
  const { toast } = useToast();
  const [errorObject, setErrorObject] = useState<AddProductSchemaType>({
    errors: {},
  });
  async function editProductAction(formData: FormData) {
    const res = await actions.editProduct(product?.id, formData);
    if (res?.errors) toast({ variant: "red", description: `🚨 ${res.errors}` });
    else
      toast({ variant: "green", description: "✅ Le produit a été modifié" });
  }

  async function addProductAction(formData: FormData) {
    const res = await actions.addProduct(formData);
    if (!res) {
      console.log("res is undefined");
      toast({ variant: "green", description: "✅ Le produit a été créé" });
    }
    if (res.errors) {
      toast({
        variant: "red",
        description: `🚨 Erreur lors de la création du produit`,
      });
      setErrorObject({ ...res });
    }
  }
  return (
    <form
      action={type === "edit" ? editProductAction : addProductAction}
      className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
    >
      <ProductHeader type={type} totalStock={product?.totalStock} />
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <ProductDetails
          type={type}
          product={product}
          brands={brands}
          categories={categories}
          errorObject={errorObject}
        />
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <ProductStatus isAvailable={product?.isActive} />
          <ProductImages
            type={type}
            imagePaths={variantsByColor?.map((variant) => variant.imagePath)}
          />
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
