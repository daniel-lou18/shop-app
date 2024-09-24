import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { centsToEuros } from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";

export type ProductCardItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  image: string;
  price?: number;
};

export type ProductCardProps = { className?: string } & {
  type: "square" | "variant";
  item: ProductCardItem;
};

function ProductCard({ type, item, className }: ProductCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { href, title, description, image } = item;

  function handleWishlist() {
    const typedItem = item as ProductCardItem;
    if (!wishlist.includes(typedItem.id)) {
      addToWishlist(typedItem.id);
    } else {
      removeFromWishlist(typedItem.id);
    }
  }

  return (
    <li className="text-decoration-none relative">
      {type === "variant" && (
        <Button
          variant="ghost"
          className="absolute py-0 px-1 sm:p-2 right-2 top-2 text-gray-500 z-[5] hover:bg-transparent"
          onClick={handleWishlist}
        >
          <Heart
            strokeWidth={1.25}
            className={wishlist.includes(item.id) ? "fill-red-400" : "none"}
          />
        </Button>
      )}
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
                  type === "variant" ? "aspect-square" : "h-[550px]"
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
              {item?.price && (
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
