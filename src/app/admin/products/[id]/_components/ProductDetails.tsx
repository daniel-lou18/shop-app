"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputField from "@/components/ui/InputField";
import ProductDynamicSelect from "./ProductDynamicSelect";
import { Brand, Category } from "@prisma/client";
import { ProductWithVariants } from "@/db/queries/product";
import ProductImageUpload from "@/components/ui/ProductImageUpload";
import { notFound } from "next/navigation";
import { AddProductSchemaType } from "@/actions/add-product";

export type ProductDetailsProps = {
  type: "add" | "edit";
  product: ProductWithVariants | undefined;
  brands: Brand[];
  categories: Category[];
  errorObject: AddProductSchemaType;
};

function ProductDetails({
  type,
  product,
  brands,
  categories,
  errorObject,
}: ProductDetailsProps) {
  const productData = product as ProductWithVariants;

  if (type === "edit" && !productData) return notFound();

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Details du produit</CardTitle>
          <CardDescription>
            {`${
              type === "edit" ? "Modifiez" : "Saisissez"
            } ci-dessous toutes les informations sur le
          produit`}
          </CardDescription>
          {errorObject && errorObject.errors?._form ? (
            <p className="text-red-500 text-sm">
              {errorObject.errors._form.join(", ")}
            </p>
          ) : null}
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <InputField
              variant="input"
              type={type}
              value={productData?.name}
              name="name"
              errorObject={errorObject}
            />
            <InputField
              variant="textarea"
              type={type}
              value={productData?.description}
              name="description"
              errorObject={errorObject}
            />
            <InputField
              variant="number"
              type={type}
              value={productData?.price / 100}
              name="price"
              errorObject={errorObject}
            />
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="grid gap-3">
                <ProductDynamicSelect
                  menuName="Marque"
                  currentValue={type === "edit" ? productData?.brand.id : ""}
                  values={brands}
                />
              </div>
              <div className="grid gap-3">
                <ProductDynamicSelect
                  menuName="Catégorie"
                  currentValue={type === "edit" ? productData?.category.id : ""}
                  values={categories}
                />
              </div>
              {type === "add" && <ProductImageUpload />}
            </div>
          </div>
        </CardContent>
        {/* {type === "add" && (
          <CardFooter className="justify-end">
            <ProductImageUpload />
          </CardFooter>
        )} */}
      </Card>
    </div>
  );
}

export default ProductDetails;
