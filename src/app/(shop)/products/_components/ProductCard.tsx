import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Brand, Product } from "@prisma/client";
import Link from "next/link";
import { centsToEuros, paths } from "@/helpers/helpers";

export type ProductCardProps =
  | {
      type: "product";
      item: Product & { brand: Brand };
    }
  | {
      type: "square";
      item: Brand;
    };

function ProductCard({ type, item }: ProductCardProps) {
  const href =
    type === "product"
      ? paths.customerProduct(item.id)
      : paths.storeBrand(item.sex, item.name);
  const title = type === "product" ? item.brand.name : item.name;

  return (
    <li className="text-decoration-none">
      <Link href={href}>
        <article className="cols-1">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 overflow-hidden">
              <Image
                alt="Product image"
                className="aspect-square w-full object-cover hover:scale-105 transition duration-1000 ease-out"
                height="200"
                src={item.imagePath || "/placeholder.svg"}
                width="300"
              />
            </CardContent>
            <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
              <CardTitle className="text-lg text-gray-950 font-bold uppercase">
                {title}
              </CardTitle>
              {type === "product" && (
                <>
                  <div className="text-base text-gray-950 mb-2">
                    {item.name}
                  </div>
                  <div className="text-base font-semibold text-gray-950">
                    {centsToEuros(item.price)}
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
