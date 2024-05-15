import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Brand, Product } from "@prisma/client";
import Link from "next/link";
import { centsToEuros } from "@/helpers/helpers";
import { paths } from "@/lib/paths";

export type Square = Brand & { imagePath: string | null; description: string };

export type ProductCardProps =
  | {
      type: "product";
      item: Product & { brand: Brand };
    }
  | {
      type: "square";
      item: Square;
    };

function ProductCard({ type, item }: ProductCardProps) {
  const href =
    type === "product"
      ? paths.customerProduct(item.id)
      : paths.storeBrand(item.sex, item.name);
  const title = type === "product" ? item.brand.name : item.name;
  const description = type === "product" ? item.name : item.description;

  return (
    <li className="text-decoration-none">
      <Link href={href}>
        <article className="cols-1">
          <Card className="border-0 shadow-none">
            <CardContent
              className={`p-0 overflow-hidden ${
                type === "product" ? "" : "rounded-md"
              }`}
            >
              <Image
                alt="Product image"
                className={`${
                  type === "product" ? "aspect-square" : "aspect-auto"
                } w-full object-cover hover:scale-105 transition duration-1000 ease-out`}
                height="600"
                src={item.imagePath || "/placeholder.svg"}
                width="400"
              />
            </CardContent>
            <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
              <CardTitle className="text-lg text-gray-950 font-bold uppercase">
                {title}
              </CardTitle>
              <div
                className={`${
                  type === "square" ? "hidden md:block" : ""
                } text-sm md:text-base text-gray-950 mb-2`}
              >
                {description}
              </div>
              {type === "product" && (
                <div className="text-base font-semibold text-gray-950">
                  {centsToEuros(item.price)}
                </div>
              )}
            </CardFooter>
          </Card>
        </article>
      </Link>
    </li>
  );
}

export default ProductCard;
