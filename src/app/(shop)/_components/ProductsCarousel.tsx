"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PageHeading1 from "../../../components/ui/PageHeading1";
import { Brand, Product, Sex } from "@prisma/client";
import ProductCard from "@/app/(shop)/products/_components/ProductCard";
import { useState } from "react";
import { capitalizeString } from "@/lib/parsers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ProductsCarouselProps = {
  title: string;
  items: (Product & { brand: Brand })[];
};

function ProductsCarousel({ title, items }: ProductsCarouselProps) {
  const [selectedSex, setSelectedSex] = useState<Sex>("femme");
  const displayedProducts = items.filter(
    (product) => product.sex === selectedSex
  );

  let content;
  if (!items || items.length === 0) {
    content = <p>Aucun produit à afficher</p>;
  } else {
    content = displayedProducts.map((item, index) => (
      <CarouselItem
        key={index}
        className={`basis-1/2 lg:basis-[375px] shadow-md`}
      >
        <div>
          <ProductCard
            type="product"
            item={item as Product & { brand: Brand }}
          />
        </div>
      </CarouselItem>
    ));
  }

  function handleSelectSex(sex: Sex) {
    setSelectedSex(sex);
  }
  return (
    <div className="px-4 md:px-0 w-full mt-4 md:mt-12">
      <Tabs value={selectedSex} className="w-full">
        <div className="flex items-center justify-between gap-8 mb-4">
          <PageHeading1 className="text-4xl mb-4">{title}</PageHeading1>
          <TabsList className="grid w-64 grid-cols-2">
            {["femme", "homme"].map((sex) => (
              <TabsTrigger
                value={sex}
                key={sex}
                onClick={() => handleSelectSex(sex as Sex)}
              >
                {capitalizeString(sex)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value={selectedSex}>
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <ul>
              <CarouselContent>{content}</CarouselContent>
            </ul>
            <>
              <CarouselPrevious className="w-12 h-12" />
              <CarouselNext className="w-12 h-12" />
            </>
          </Carousel>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductsCarousel;