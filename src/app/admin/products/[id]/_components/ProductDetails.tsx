"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { notFound } from "next/navigation";
import ProductDynamicSelect from "./ProductDynamicSelect";
import { Brand, Category, Product } from "@prisma/client";
import { AddProductSchemaType } from "@/actions/add-product";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import * as actions from "@/actions";
import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/ButtonSubmit";

export type ProductWithBrandCategory = Product & {
  brand: Brand;
  category: Category;
};

export type ProductDetailsProps = {
  brands: Brand[];
  categories: Category[];
} & (
  | { type: "add"; id?: never; product?: never }
  | { type: "edit"; product: ProductWithBrandCategory; id: string }
);

function ProductDetails({
  type,
  id,
  product,
  brands,
  categories,
}: ProductDetailsProps) {
  const { toast } = useToast();
  const [errorObject, setErrorObject] = useState<AddProductSchemaType>({
    errors: {},
  });
  const productData = product as ProductWithBrandCategory;
  async function editProductAction(id: string, formData: FormData) {
    const res = await actions.editProduct(id, formData);
    if (res?.error) toast({ variant: "red", description: `🚨 ${res.error}` });
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

  // if (type === "edit" && !productData) return notFound();

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <form
        action={
          type === "edit" ? editProductAction.bind(null, id) : addProductAction
        }
      >
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
                  defaultValue={type === "edit" ? productData?.name : ""}
                  placeholder={
                    type !== "edit" ? "Saisissez le nom du produit" : ""
                  }
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
                  defaultValue={type === "edit" ? productData?.description : ""}
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
                  defaultValue={type === "edit" ? productData?.price : 0}
                  name="price"
                />
                {errorObject && errorObject.errors?.price && (
                  <p className="text-red-500 text-xs">
                    {errorObject.errors.price.join(", ")}
                  </p>
                )}
              </div>
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
                    currentValue={
                      type === "edit" ? productData?.category.id : ""
                    }
                    values={categories}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type="button" variant="outline" size="sm">
                Annuler
              </Button>
              <ButtonSubmit>Sauvegarder</ButtonSubmit>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default ProductDetails;
