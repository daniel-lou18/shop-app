"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { notFound } from "next/navigation";
import ProductDynamicSelect from "./ProductDynamicSelect";
import { Brand, Category, Product } from "@prisma/client";
import { AddProductSchemaType } from "@/actions/add-product";
import { AddData, EditData } from "../page";

export type ProductWithBrandCategory = Product & {
  brand: Brand;
  category: Category;
};

type ProductDetailsProps = {
  type: "edit" | "add";
  errorObject: AddProductSchemaType | null;
} & ({ type: "add"; data: AddData } | { type: "edit"; data: EditData });

function ProductDetails({
  type = "edit",
  data,
  errorObject,
}: ProductDetailsProps) {
  const editData = data as EditData;

  if (type === "edit" && !editData.product) return notFound();

  return (
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
          <div className="grid gap-3">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue={type === "edit" ? editData.product?.name : ""}
              placeholder={type !== "edit" ? "Saisissez le nom du produit" : ""}
              name="name"
            />
            {errorObject && errorObject.errors?.name && (
              <p className="text-red-500 text-xs">
                {errorObject.errors.name.join(", ")}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="min-h-32"
              defaultValue={
                type === "edit" ? editData.product?.description : ""
              }
              placeholder={
                type !== "edit" ? "Saisissez la description du produit" : ""
              }
              name="description"
            />
            {errorObject && errorObject.errors?.description && (
              <p className="text-red-500 text-xs">
                {errorObject.errors.description.join(", ")}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              type="number"
              className="w-full"
              defaultValue={type === "edit" ? editData.product?.price : 0}
              name="price"
            />
            {errorObject && errorObject.errors?.price && (
              <p className="text-red-500 text-xs">
                {errorObject.errors.price.join(", ")}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="imagePath">Image(s)</Label>
            <Input
              id="imagePath"
              type="text"
              className="w-full"
              defaultValue={type === "edit" ? editData.product?.imagePath : ""}
              name="imagePath"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <ProductDynamicSelect
                menuName="Marque"
                currentValue={type === "edit" ? editData.product?.brand.id : ""}
                values={data.brands}
              />
            </div>
            <div className="grid gap-3">
              <ProductDynamicSelect
                menuName="Catégorie"
                currentValue={
                  type === "edit" ? editData.product?.category.id : ""
                }
                values={data.categories}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductDetails;
