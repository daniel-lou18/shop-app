import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Brand, Product } from "@prisma/client";
import Link from "next/link";
import { centsToEuros } from "@/helpers/helpers";

type ProductCardProps = Product & { brand: Brand };

function ProductCard({ id, name, brand, imagePath, price }: ProductCardProps) {
  const image = imagePath?.split(" ").at(0);
  return (
    <li>
      <Link href={`/products/${id}`}>
        <article className="cols-1">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <Image
                alt="Product image"
                className="aspect-square w-full object-cover"
                height="200"
                src={image || "/placeholder.svg"}
                width="300"
              />
            </CardContent>
            <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
              <CardTitle className="text-lg text-gray-950">
                {brand.name.toUpperCase()}
              </CardTitle>
              <CardDescription className="text-lg text-gray-950">
                {name}
              </CardDescription>
              <CardDescription className="text-lg font-semibold text-gray-950">
                {centsToEuros(price)}
              </CardDescription>
            </CardFooter>
          </Card>
        </article>
      </Link>
    </li>
  );
}

export default ProductCard;
