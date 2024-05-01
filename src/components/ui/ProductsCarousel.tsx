import ProductCard, {
  ProductCardProps,
} from "@/app/(shop)/products/_components/ProductCard";
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

export type ProductsCarouselProps = { title: string } & (
  | {
      type: "square" | "product";
      products: (Product & { brand: Brand })[];
    }
  | {
      type: "circle";
      products: { imagepath: string; name: string }[];
    }
);

function ProductsCarousel({ type, title, products }: ProductsCarouselProps) {
  return (
    <div className="w-full mt-12">
      <PageHeading1>{title}</PageHeading1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <ul>
          <CarouselContent>
            {(type === "square" || type === "product") &&
              products.slice(0, 15).map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                  <div className="p-1">
                    <ProductCard type={type} {...product} />
                  </div>
                </CarouselItem>
              ))}
            {type === "circle" &&
              products.slice(0, 15).map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                  <div className="p-2 flex flex-col gap-2 items-center">
                    <Image
                      alt="Product image"
                      src={product.imagePath || "/Designer(2).jpeg"}
                      width={250}
                      height={250}
                      className="aspect-square w-full rounded-full object-cover"
                    />
                    <h3 className="font-medium">
                      {product.name.toUpperCase()}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </ul>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ProductsCarousel;
