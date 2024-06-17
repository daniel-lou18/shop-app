import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PageHeading1 from "./PageHeading1";
import ProductCard from "@/app/(shop)/products/_components/ProductCard";
import { brandsMen } from "@/helpers/constants";
import { ShopifyProduct } from "@/types";

export type ItemsCarouselProps = { title: string } & (
  | {
      type: "product";
      items: ShopifyProduct[];
    }
  | {
      type: "square";
      items: typeof brandsMen;
    }
);

function ItemsCarousel({ type, title, items }: ItemsCarouselProps) {
  let content;
  if (items.length === 0) {
    content = <p>Aucun produit à afficher</p>;
  } else {
    content = items.slice(0, 15).map((item, index) => (
      <CarouselItem
        key={index}
        className={`basis-1/2 ${
          type === "square" ? "lg:basis-1/3" : "lg:basis-1/5"
        }`}
      >
        <div className="p-1">
          {type === "product" && (
            <ProductCard type={type} item={item as ShopifyProduct} />
          )}
          {type === "square" && (
            <ProductCard type={type} item={item as (typeof brandsMen)[0]} />
          )}
        </div>
      </CarouselItem>
    ));
  }

  return (
    <div className="px-4 md:px-0 w-full mt-12 md:mt-24">
      <PageHeading1>{title}</PageHeading1>
      {items.length === 0 ? (
        content
      ) : (
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
      )}
    </div>
  );
}

export default ItemsCarousel;
