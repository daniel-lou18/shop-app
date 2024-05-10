import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PageHeading1 from "./PageHeading1";
import { Brand, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/helpers/helpers";
import { AllCategories } from "@/db/queries/categories";
import ProductCard, {
  Square,
} from "@/app/(shop)/products/_components/ProductCard";
import { BrandSquare } from "@/app/(shop)/page";

export type ItemsCarouselProps = { title: string } & (
  | {
      type: "product";
      items: (Product & { brand: Brand })[];
    }
  | {
      type: "square";
      items: BrandSquare[];
    }
  | {
      type: "circle";
      items: AllCategories;
    }
);

function ItemsCarousel({ type, title, items }: ItemsCarouselProps) {
  let content;
  content = items.slice(0, 15).map((item, index) => (
    <CarouselItem
      key={index}
      className={`basis-1/2 ${
        type === "square" ? "lg:basis-1/3" : "lg:basis-1/5"
      }`}
    >
      {type === "circle" ? (
        <Link href={paths.storeCategory(item.sex, item.name)}>
          <div className="p-2 flex flex-col gap-2 items-center">
            <div className="overflow-hidden rounded-full">
              <Image
                alt="category image"
                src={"/Designer(2).jpeg"}
                width={250}
                height={250}
                className="aspect-square w-full object-cover hover:scale-110 transition duration-1000 ease-out"
              />
            </div>
            <h3 className="font-medium">{item.name.toUpperCase()}</h3>
          </div>
        </Link>
      ) : (
        <div className="p-1">
          {type === "product" && (
            <ProductCard
              type={type}
              item={item as Product & { brand: Brand }}
            />
          )}
          {type === "square" && (
            <ProductCard type={type} item={item as Square} />
          )}
        </div>
      )}
    </CarouselItem>
  ));

  return (
    <div className="w-full mt-24">
      <PageHeading1>{title}</PageHeading1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <ul>
          <CarouselContent>{content}</CarouselContent>
        </ul>
        {type !== "square" && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}

export default ItemsCarousel;
