import {
  AllProductsWithVariants,
  fetchAllProductsWithData,
} from "@/db/queries/products";
import React from "react";
import Banner from "./_components/Banner";
import {
  mainHero,
  brandBanner,
  brandsMen,
  brandsWomen,
  oceanBanner,
} from "@/helpers/constants";
import BannerTop from "./_components/BannerTop";
import ProductsCarousel from "@/app/(shop)/_components/ProductsCarousel";
import BrandsCards from "./_components/BrandsCards";
import ButtonsGender from "./_components/ButtonsGender";
import { Button } from "@/components/ui/button";

async function MainContent() {
  const resultWomen = await fetchAllProductsWithData<AllProductsWithVariants>({
    where: { sex: "femme" },
    take: 15,
  });
  const resultMen = await fetchAllProductsWithData<AllProductsWithVariants>({
    where: { sex: "homme" },
    take: 15,
  });
  const productsWomen = resultWomen.success ? resultWomen.data : [];
  const productsMen = resultMen.success ? resultMen.data : [];

  return (
    <div className="bg-gray-50">
      <BannerTop data={mainHero}>
        <ButtonsGender
          data={mainHero.buttonsData}
          className="hidden lg:flex gap-4 justify-end md:text-xl"
        />
      </BannerTop>
      <div className="sm:px-16 sm:py-8">
        {/* <MainTop /> */}
        <ProductsCarousel
          title="Nouveautés"
          items={[...productsWomen, ...productsMen]}
        />
      </div>
      <Banner data={brandBanner} className="mt-8 md:mt-6">
        <ButtonsGender
          data={brandBanner.buttonsData}
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        />
      </Banner>
      <div className="sm:px-16 sm:py-8">
        <BrandsCards
          title="Marques incontournables"
          items={[...brandsWomen, ...brandsMen]}
        />
      </div>
      <Banner data={oceanBanner} className="mt-8 md:mt-6">
        <Button
          variant="secondary"
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        >
          En savoir plus
        </Button>
      </Banner>
      <div className="sm:px-16 sm:py-8">
        <ProductsCarousel
          title="Nos bestsellers"
          items={[...productsWomen, ...productsMen]}
        />
      </div>
    </div>
  );
}

export default MainContent;
