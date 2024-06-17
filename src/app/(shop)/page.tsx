import ItemsCarousel from "@/components/ui/ItemsCarousel";
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
import { getProducts } from "@/services/productsService";

async function MainContent() {
  const result = await getProducts();
  const productsMen = result.success
    ? result.data.filter((product) => product.tags.includes("homme"))
    : [];
  const productsWomen = result.success
    ? result.data.filter((product) => product.tags.includes("femme"))
    : [];
  const productsMixed = [
    ...productsMen.slice(0, 3),
    ...productsWomen.slice(0, 3),
    ...productsMen.slice(3, 8),
    ...productsWomen.slice(3, 8),
  ];

  return (
    <div className="sm:px-8">
      <Banner data={mainHero}>
        <Button
          variant="secondary"
          className="rounded-full text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Je fonce
        </Button>
      </Banner>
      <MainTop />
      <ItemsCarousel
        type="product"
        title="Nos bestsellers"
        items={productsMixed}
      />
      <Banner data={brandBanner} className="mt-8 md:mt-24">
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
    </div>
  );
}

export default MainContent;
