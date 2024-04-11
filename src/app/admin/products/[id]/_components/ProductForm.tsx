"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductDetails from "./ProductDetails";
import * as actions from "@/actions";
import { Brand, Category, Product, ProductVariant } from "@prisma/client";
import ButtonSubmit from "../../../../../components/ui/ButtonSubmit";
import { useToast } from "../../../../../components/ui/use-toast";
import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";
import { AddProductSchemaType } from "@/actions/add-product";
import { useState } from "react";

type ProductFormProps = {
  type: "add" | "edit";
  brands: Brand[];
  categories: Category[];
} & (
  | {
      type: "edit";
      id: string;
      product: Product & { brand: Brand; category: Category };
      variants: ProductVariant[] | null | { error: string };
    }
  | { type: "add"; id?: never; product?: never; variants?: never }
);

function ProductForm({
  type,
  id,
  product,
  brands,
  categories,
  variants,
}: ProductFormProps) {
  const { toast } = useToast();
  const [errorObject, setErrorObject] = useState<AddProductSchemaType>({
    errors: {},
  });

  async function editProductAction(id: string, formData: FormData) {
    const res = await actions.editProduct(id, formData);
    if (res?.error) toast({ variant: "red", description: `🚨 ${res.error}` });
    else
      toast({ variant: "green", description: "✅ Le produit a été modifié" });
  }

  async function addProductAction(formData: FormData) {
    const res = await actions.addProduct(formData);
    // if (res?.error) toast({ variant: "red", description: `🚨 ${res.error}` });
    if (res.errors) setErrorObject({ ...res });
    else toast({ variant: "green", description: "✅ Le produit a été créé" });
  }

  return (
    <form
      action={
        type === "edit" ? editProductAction.bind(null, id) : addProductAction
      }
    >
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-7 w-7"
            asChild
          >
            <Link href="/admin/products">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Retourner</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {`${
              type === "edit" ? "Modifier un" : "Ajouter un nouveau"
            } produit`}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            En stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button type="button" variant="outline" size="sm">
              Annuler
            </Button>
            <ButtonSubmit>Sauvegarder</ButtonSubmit>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            {type === "edit" ? (
              <ProductDetails
                type={type}
                product={product}
                brands={brands}
                categories={categories}
                errorObject={errorObject}
              />
            ) : (
              <ProductDetails
                type={type}
                brands={brands}
                categories={categories}
                errorObject={errorObject}
              />
            )}
            <ProductVariants variants={variants} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <ProductImages id={id} imagePath={product?.imagePath} />
            <Card>
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button type="button" size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button type="button" variant="outline" size="sm">
            Annuler
          </Button>
          <Button type="submit" size="sm">
            Sauvegarder
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
