import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import Link from "next/link";
import { ProductWithBrandCategory } from "../admin-product/ProductDetails";
import { centsToEuros } from "@/lib/helpers";
import ButtonSubmit from "../ui/ButtonSubmit";

function ProductCard({ product }: { product: ProductWithBrandCategory }) {
  const sizes = ["XS", "S", "M", "L", "XL"];
  let colors;
  const { id, name, brand, imagePath, price } = product;
  const image = imagePath.split(" ").at(0);
  return (
    <Card className="border-0 shadow-none w-1/2">
      <CardHeader className="p-0">
        <CardTitle>{brand.name.toUpperCase()}</CardTitle>
        <h1 className="text-2xl font-bold">{name}</h1>
        <CardDescription className="text-xl text-gray-950 font-semibold">
          {centsToEuros(price)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          <p>Votre taille</p>
          <ToggleGroup
            type="single"
            defaultValue="s"
            variant="outline"
            className="gap-4 justify-start"
          >
            {sizes.map((size) => (
              <ToggleGroupItem value={size} key={size} className="w-16">
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
        <ButtonSubmit className="w-full">Ajouter au panier</ButtonSubmit>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
