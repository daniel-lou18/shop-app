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

export type ProductWithBrandCategory = Product & {
  brand: Brand;
  category: Category;
};

type ProductDetailsProps = {
  type: "edit" | "add";
  brands: Brand[];
  categories: Category[];
} & (
  | { type: "add"; product?: never }
  | { type: "edit"; product: ProductWithBrandCategory }
);

async function ProductDetails({
  type = "edit",
  product,
  brands,
  categories,
}: ProductDetailsProps) {
  if (type === "edit" && !product) return notFound();

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
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue={product?.name}
              placeholder={type !== "edit" ? "Saisissez le nom du produit" : ""}
              name="name"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="min-h-32"
              defaultValue={product?.description}
              placeholder={
                type !== "edit" ? "Saisissez la description du produit" : ""
              }
              name="description"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              type="number"
              className="w-full"
              defaultValue={product?.price || 0}
              name="price"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="imagePath">Image(s)</Label>
            <Input
              id="imagePath"
              type="text"
              className="w-full"
              defaultValue={product?.imagePath}
              name="imagePath"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <ProductDynamicSelect
                menuName="Marque"
                currentValue={product?.brand.id || ""}
                values={brands}
              />
            </div>
            <div className="grid gap-3">
              <ProductDynamicSelect
                menuName="Catégorie"
                currentValue={product?.category.id || ""}
                values={categories}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductDetails;
