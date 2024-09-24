import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { centsToEuros, shortenText } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";
import BaseComponent from "@/components/ui/BaseComponent";

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

  if (type === "variant")
    return (
      <BaseComponent tag="li" className="text-decoration-none relative h-full">
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
        <Link href={href}>
          <BaseComponent tag="article" className="h-full">
            <Card
              className={cn(
                "border-0 shadow-none overflow-hidden h-full",
                className
              )}
            >
              <CardContent className="p-0 overflow-hidden">
                <Image
                  alt="Product image"
                  className="aspect-square w-full object-cover object-top overflow-hidden hover:scale-105 transition duration-1000 ease-out"
                  height="600"
                  src={image || "/placeholder.svg"}
                  width="400"
                />
              </CardContent>
              <CardFooter className="flex-col items-start p-2 text-lg">
                <CardTitle className="text-gray-950 font-bold uppercase">
                  <BaseComponent tag="span" className="block sm:hidden text-sm">
                    {shortenText(title)}
                  </BaseComponent>
                  <BaseComponent tag="span" className="hidden sm:block text-lg">
                    {title}
                  </BaseComponent>
                </CardTitle>
                <BaseComponent className="text-sm md:hidden text-gray-950 mb-2">
                  {shortenText(description, 21)}
                </BaseComponent>
                <BaseComponent className="hidden md:block text-base text-gray-950 mb-2">
                  {description}
                </BaseComponent>
                {item?.price && (
                  <BaseComponent className="text-base font-semibold text-gray-950">
                    {centsToEuros(item.price)}
                  </BaseComponent>
                )}
              </CardFooter>
            </Card>
          </BaseComponent>
        </Link>
      </BaseComponent>
    );

  return (
    <BaseComponent tag="li" className="text-decoration-none relative h-full">
      <Link href={href}>
        <BaseComponent tag="article" className="h-full">
          <Card
            className={cn(
              "border-0 shadow-none overflow-hidden h-full",
              className
            )}
          >
            <CardContent className="p-0 overflow-hidden">
              <Image
                alt="Product image"
                className="h-[550px] w-full object-cover object-top overflow-hidden hover:scale-105 transition duration-1000 ease-out"
                height="600"
                src={image || "/placeholder.svg"}
                width="400"
              />
            </CardContent>
            <CardFooter className="flex-col items-start p-2 text-lg">
              <CardTitle className="text-gray-950 font-bold uppercase">
                <BaseComponent tag="span" className="block sm:hidden text-sm">
                  {shortenText(title)}
                </BaseComponent>
                <BaseComponent tag="span" className="hidden sm:block text-lg">
                  {title}
                </BaseComponent>
              </CardTitle>
              <BaseComponent className="hidden md:block text-sm md:text-base text-gray-950 mb-2">
                {description}
              </BaseComponent>
            </CardFooter>
          </Card>
        </BaseComponent>
      </Link>
    </BaseComponent>
  );
}

export default ProductCard;
