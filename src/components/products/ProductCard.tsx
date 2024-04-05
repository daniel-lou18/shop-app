import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Brand, Product } from "@prisma/client";

type ProductCardProps = Product & { brand: Brand };

function ProductCard({ id, name, brand, imagePath, price }: ProductCardProps) {
  return (
    <li>
      <article className="cols-1">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <Image
              alt="Product image"
              className="aspect-square w-full object-cover"
              height="200"
              src={imagePath}
              width="300"
            />
          </CardContent>
          <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
            <CardTitle className="text-lg">{brand.name}</CardTitle>
            <CardDescription className="text-lg">{name}</CardDescription>
            <CardDescription className="text-lg font-semibold">
              {(price / 100).toFixed(2)} €
            </CardDescription>
          </CardFooter>
        </Card>
      </article>
    </li>
  );
}

export default ProductCard;
