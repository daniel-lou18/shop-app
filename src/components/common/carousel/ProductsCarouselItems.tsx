"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PageHeading1 from "../../ui/PageHeading1";
import { Sex } from "@prisma/client";
import { useState } from "react";
import { capitalizeString } from "@/lib/parsers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { VariantWithProduct, VariantsWithProduct } from "@/db/queries/variants";
import VariantCard from "../card/VariantCard";
import { dtosToVariants } from "@/features/variants/transformDto";
import BaseComponent from "@/components/ui/BaseComponent";

export type ProductsCarouselItemsProps = {
  title: string;
  items: VariantsWithProduct;
  displayTabs?: boolean;
  className?: string;
};

function ProductsCarouselItems({
  title,
  items,
  displayTabs = true,
  className,
}: ProductsCarouselItemsProps) {
  const [selectedSex, setSelectedSex] = useState<Sex>("femme");
  const flattenedVariantsWithProduct = dtosToVariants(items);
  const displayedProducts = flattenedVariantsWithProduct.filter((variant) =>
    displayTabs ? variant.sex === selectedSex : variant
  );

  let content;
  if (!items?.length) {
    content = <p>Aucun produit à afficher</p>;
  } else {
    content = displayedProducts.map((item, index) => (
      <CarouselItem
        key={index}
        className={`basis-1/2 lg:basis-[375px] shadow-md bg-white`}
      >
        <VariantCard item={item} />
      </CarouselItem>
    ));
  }

  function handleSelectSex(sex: Sex) {
    setSelectedSex(sex);
  }
  return (
    <div className={cn("p-4 sm:px-16 sm:py-8 w-full mt-4 md:mt-12", className)}>
      <Tabs value={selectedSex} className="w-full">
        <BaseComponent className="flex items-center justify-between gap-8 mb-4">
          <PageHeading1 className="mb-0">{title}</PageHeading1>
          {displayTabs && (
            <TabsList className="grid w-64 grid-cols-2">
              {["femme", "homme"].map((sex) => (
                <TabsTrigger
                  value={sex}
                  key={sex}
                  onClick={() => handleSelectSex(sex as Sex)}
                  className="uppercase"
                >
                  {capitalizeString(sex)}
                </TabsTrigger>
              ))}
            </TabsList>
          )}
        </BaseComponent>
        <TabsContent value={selectedSex}>
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <BaseComponent tag="ul">
              <CarouselContent>{content}</CarouselContent>
            </BaseComponent>
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

export default ProductsCarouselItems;
