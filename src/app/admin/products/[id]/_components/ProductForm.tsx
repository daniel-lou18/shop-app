"use client";

import ProductHeader from "./ProductHeader";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import { ProductWithStock } from "@/db/queries/product";
import { Brand, Category, ProductVariant } from "@prisma/client";
import { ProductVariantsByColor } from "@/db/queries/variants";
import ProductStatus from "./ProductStatus";
import { AddProductSchemaType } from "@/actions/add-product";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

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
  const [addFormState, addFormAction] = useFormState(actions.addProduct, {});
  const [editFormState, editFormAction] = useFormState(
    actions.editProduct.bind(null, product?.id),
    {}
  );
  const [errorObject, setErrorObject] = useState<AddProductSchemaType>({
    errors: {},
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (editFormState.errors) setErrorObject(editFormState);
    if (addFormState.errors) setErrorObject(addFormState);
  }, [addFormState, editFormState]);

  useEffect(() => {
    if (editFormState.errors?._form) {
      toast.error(editFormState.errors?._form.join(", "));
    }
    if (addFormState.errors?._form) {
      toast.error(addFormState.errors?._form.join(", "));
    }
  }, [editFormState, addFormState, searchParams]);

  return (
    <form
      action={type === "edit" ? editFormAction : addFormAction}
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
          <ProductStatus isActive={product?.isActive} />
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
