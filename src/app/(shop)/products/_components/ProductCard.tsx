import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Brand, Product } from "@prisma/client";
import Link from "next/link";
import { centsToEuros } from "@/helpers/helpers";

export type ProductCardProps = Product & {
  type: "product" | "square" | "circle";
  brand: Brand;
};

function ProductCard({
  type,
  id,
  name,
  brand,
  imagePath,
  price,
}: ProductCardProps) {
  return (
    <li className="text-decoration-none">
      <Link href={`/products/${id}`}>
        <article className="cols-1">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <Image
                alt="Product image"
                className="aspect-square w-full object-cover"
                height="200"
                src={imagePath || "/placeholder.svg"}
                width="300"
              />
            </CardContent>
            <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
              <CardTitle className="text-lg text-gray-950 font-bold uppercase">
                {type === "product" ? brand.name : name}
              </CardTitle>
              {type === "product" && (
                <>
                  <div className="text-base text-gray-950 mb-2">{name}</div>
                  <div className="text-base font-semibold text-gray-950">
                    {centsToEuros(price)}
                  </div>
                </>
              )}
            </CardFooter>
          </Card>
        </article>
      </Link>
    </li>
  );
}

export default ProductCard;
