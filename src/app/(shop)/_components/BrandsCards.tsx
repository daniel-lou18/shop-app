"use client";

import PageHeading1 from "@/components/ui/PageHeading1";
import ProductCard from "@/app/(shop)/products/_components/ProductCard";
import { BrandSquare } from "@/types";
import { useState } from "react";
import { Sex } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type BrandsCardsProps = { title: string; items: BrandSquare[] };

function BrandsCards({ title, items }: BrandsCardsProps) {
  const [selectedSex, setSelectedSex] = useState<Sex>("femme");
  const displayedProducts = items.filter(
    (product) => product.sex === selectedSex
  );

  let content;
  if (!items?.length) {
    content = <p>Aucun produit à afficher</p>;
  } else {
    content = displayedProducts.map((item, index) => (
      <ProductCard
        type="square"
        item={item as BrandSquare}
        key={index}
        className={`shadow-md ${index > 1 ? "hidden lg:block" : "block"}`}
      />
    ));
  }

  function handleSelectSex(sex: Sex) {
    setSelectedSex(sex);
  }

  return (
    <div className="p-4 sm:px-16 sm:py-8 w-full mt-12 md:mt-12">
      <Tabs value={selectedSex} className="w-full">
        <div className="flex items-center justify-between gap-8 mb-4">
          <PageHeading1 className="mb-0">{title}</PageHeading1>
          <TabsList className="grid w-64 grid-cols-2">
            {["femme", "homme"].map((sex) => (
              <TabsTrigger
                value={sex}
                key={sex}
                onClick={() => handleSelectSex(sex as Sex)}
                className="uppercase"
              >
                {sex}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value={selectedSex}>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {content}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BrandsCards;
