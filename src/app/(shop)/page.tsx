import {
  ProductsWithVariants,
  fetchProductsWithData,
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
import { VariantsWithProduct, fetchVariants } from "@/db/queries/variants";

async function MainContent() {
  const resultWomen = await fetchVariants<VariantsWithProduct>({
    where: { product: { sex: "femme" } },
    take: 12,
  });
  const resultMen = await fetchVariants<VariantsWithProduct>({
    where: { product: { sex: "homme" } },
    take: 12,
  });
  const productsWomen = resultWomen.success ? resultWomen.data : [];
  const productsMen = resultMen.success ? resultMen.data : [];

  return (
    <div className="bg-gray-50 pb-16">
      <BannerTop data={mainHero}>
        <ButtonsGender
          data={mainHero.buttonsData}
          className="hidden lg:flex gap-4 justify-end md:text-xl"
        />
      </BannerTop>
      {/* <MainTop /> */}
      <ProductsCarousel
        title="Nouveautés"
        items={[...productsWomen, ...productsMen]}
      />
      <Banner data={brandBanner} className="mt-8 md:mt-6">
        <ButtonsGender
          data={brandBanner.buttonsData}
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
        />
      </Banner>
      <BrandsCards
        title="Marques incontournables"
        items={[...brandsWomen, ...brandsMen]}
      />
      <Banner data={oceanBanner} className="mt-8 md:mt-6">
        <Button
          variant="outline"
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-transparent text-white rounded-sm border-2"
        >
          En savoir plus
        </Button>
      </Banner>
      <ProductsCarousel
        title="Nos bestsellers"
        items={[...productsWomen, ...productsMen]}
      />
    </div>
  );
}

export default MainContent;
