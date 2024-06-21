import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Brand, Product } from "@prisma/client";
import Link from "next/link";
import { centsToEuros } from "@/helpers/helpers";
import { paths } from "@/lib/paths";
import { BrandSquare } from "@/types";
import { cn } from "@/lib/utils";
export type ProductCardProps = { className?: string } & (
  | {
      type: "product";
      item: Product & { brand: Brand };
    }
  | {
      type: "square";
      item: BrandSquare;
    }
);

function ProductCard({ type, item, className }: ProductCardProps) {
  const href =
    type === "product"
      ? paths.customerProduct(item.id)
      : paths.storeBrand(item.sex, item.name);
  const title = type === "product" ? item.brand.name : item.name;
  const description = type === "product" ? item.name : item.description;

  return (
    <li className="text-decoration-none">
      <Link href={href}>
        <article className="h-full">
          <Card
            className={cn(
              "border-0 shadow-none overflow-hidden h-full",
              className
            )}
          >
            <CardContent className="p-0 overflow-hidden">
              <Image
                alt="Product image"
                className={`${
                  type === "product" ? "aspect-square" : "h-[550px]"
                } w-full object-cover object-top overflow-hidden hover:scale-105 transition duration-1000 ease-out`}
                height="600"
                src={item.imagePath || "/placeholder.svg"}
                width="400"
              />
            </CardContent>
            <CardFooter className="flex-col items-start py-4 px-4 text-lg">
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
