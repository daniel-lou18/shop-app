import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { centsToEuros } from "@/helpers/helpers";
import { paths } from "@/lib/paths";
import { BrandSquare } from "@/types";
import { cn } from "@/lib/utils";
import { ProductWithVariants } from "@/db/queries/product";
import { VariantWithProduct } from "@/db/queries/variants";
export type ProductCardProps = { className?: string } & (
  | {
      type: "product";
      item: ProductWithVariants;
    }
  | {
      type: "square";
      item: BrandSquare;
    }
  | {
      type: "variant";
      item: VariantWithProduct;
    }
);

function ProductCard({ type, item, className }: ProductCardProps) {
  let href, title, description, image;
  if (type === "product") {
    href = paths.customerProduct(item.id);
    title = item.brand.name;
    description = item.name;
    image = item.imagePath;
  } else if (type === "square") {
    href = paths.storeBrand(item.sex, item.name);
    title = item.name;
    description = item.description;
    image = item.imagePath;
  } else {
    href = paths.customerProduct(item.productId, `color=${item.color}`);
    title = item.product.brand.name;
    description = item.product.name;
    image = item.images[0];
  }

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
                  type === "product" || type === "variant"
                    ? "aspect-square"
                    : "h-[550px]"
                } w-full object-cover object-top overflow-hidden hover:scale-105 transition duration-1000 ease-out`}
                height="600"
                src={image || "/placeholder.svg"}
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
              {(type === "product" || type === "variant") && (
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
