import ItemsCarousel from "@/components/ui/ItemsCarousel";
import { fetchAllProductsWithData } from "@/db/queries/products";
import React from "react";
import MainTop from "./_components/MainTop";
import Banner from "./_components/Banner";
import { Button } from "@/components/ui/button";
import {
  mainHero,
  brandBanner,
  brandsMen,
  brandsWomen,
} from "@/helpers/constants";

export type BrandSquare = {
  id: number;
  name: string;
  sex: string;
  imagePath: string;
  description: string;
};

async function MainContent() {
  const products = (await fetchAllProductsWithData()).filter(
    (product) => product.sex === "femme"
  );
  const productsMen = (await fetchAllProductsWithData()).filter(
    (product) => product.sex === "homme"
  );
  const productsWomen = (await fetchAllProductsWithData()).filter(
    (product) => product.sex === "femme"
  );

  return (
    <main className="sm:px-8">
      <Banner data={mainHero}>
        <Button
          variant="secondary"
          className="rounded-full text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Je fonce
        </Button>
      </Banner>
      <MainTop />
      <ItemsCarousel type="product" title="Nos bestsellers" items={products} />
      <Banner data={brandBanner} className="mt-24">
        <Button
          variant="secondary"
          className="rounded-full text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Découvrir
        </Button>
      </Banner>
      <ItemsCarousel
        type="square"
        title="Marques hommes incontournables"
        items={brandsMen}
      />
      <ItemsCarousel
        type="square"
        title="Marques femmes incontournables"
        items={brandsWomen}
      />
      <ItemsCarousel
        type="product"
        title="Notre sélection hommes"
        items={productsMen}
      />
      <ItemsCarousel
        type="product"
        title="Notre sélection femmes"
        items={productsWomen}
      />
    </main>
  );
}

export default MainContent;
