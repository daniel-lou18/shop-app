import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Brand } from "@prisma/client";
import Link from "next/link";
import { brandsMen } from "@/helpers/constants";
import { ShopifyProduct } from "@/types";
import { getProductCardVariables } from "@/lib/parsers";

export type Square = Brand & { imagePath: string | null; description: string };

export type ProductCardProps =
  | {
      type: "product";
      item: ShopifyProduct;
    }
  | {
      type: "square";
      item: (typeof brandsMen)[0];
    };

function ProductCard({ type, item }: ProductCardProps) {
  const {
    href,
    title,
    description,
    imageHeight,
    imageWidth,
    imageSrc,
    imageAlt,
  } = getProductCardVariables(type, item);

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
                alt={imageAlt}
                className={`${
                  type === "product" ? "aspect-square" : "aspect-auto"
                } w-full object-cover hover:scale-105 transition duration-1000 ease-out`}
                height={imageHeight}
                width={imageWidth}
                src={imageSrc}
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
                  {item.priceRangeV2.minVariantPrice.amount}
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
