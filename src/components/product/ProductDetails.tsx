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

type ProductDetailsProps = {
  type?: "edit" | "add";
} & (
  | { type: "add"; product?: never }
  | { type?: "edit"; product: Product & { brand: Brand; category: Category } }
);

async function ProductDetails({ type = "edit", product }: ProductDetailsProps) {
  if (type === "edit" && !product) return notFound();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du produit</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
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
            <Label htmlFor="imagePath">Image</Label>
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
                tableName="brand"
                currentValue={product?.brand.id || ""}
              />
            </div>
            <div className="grid gap-3">
              <ProductDynamicSelect
                tableName="category"
                currentValue={product?.category.id || ""}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductDetails;
