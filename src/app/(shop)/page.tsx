import React, { Suspense } from "react";
import Banner from "./_components/Banner";
import {
  mainHero,
  brandBanner,
  brandsMen,
  brandsWomen,
  oceanBanner,
} from "@/helpers/constants";
import BannerTop from "./_components/BannerTop";
import BrandsCards from "./_components/BrandsCards";
import ButtonsGender from "./_components/ButtonsGender";
import { Button } from "@/components/ui/button";
import ProductsCarousel from "./_components/ProductsCarousel";
import CarouselSkeleton from "../../components/skeletons/CarouselSkeleton";

async function MainContent() {
  return (
    <div className="bg-gray-50 pb-16">
      <BannerTop data={mainHero}>
        <ButtonsGender data={mainHero.buttonsData} />
      </BannerTop>
      <Suspense fallback={<CarouselSkeleton />}>
        <ProductsCarousel title="Nouveautés" />
      </Suspense>
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
      <ProductsCarousel title="Nos bestsellers" />
    </div>
  );
}

export default MainContent;
