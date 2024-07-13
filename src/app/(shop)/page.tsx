import React, { Suspense } from "react";
import { mainHero, brandsMen, brandsWomen } from "@/helpers/constants";
import BannerTop from "../../components/common/banner/BannerTop";
import BrandsCards from "../../components/common/card/BrandsCards";
import ButtonsGender from "../../components/common/banner/ButtonsGender";
import ProductsCarousel from "../../components/common/carousel/ProductsCarousel";
import CarouselSkeleton from "../../components/skeletons/CarouselSkeleton";
import BannerBrand from "../../components/common/banner/BannerBrand";
import BannerMission from "../../components/common/banner/BannerMission";

async function MainContent() {
  return (
    <div className="bg-gray-50 pb-16">
      <BannerTop data={mainHero}>
        <ButtonsGender data={mainHero.buttonsData} />
      </BannerTop>
      <Suspense fallback={<CarouselSkeleton />}>
        <ProductsCarousel title="Nouveautés" />
      </Suspense>
      <BannerBrand />
      <BrandsCards
        title="Marques incontournables"
        items={[...brandsWomen, ...brandsMen]}
      />
      <BannerMission />
      <ProductsCarousel title="Nos bestsellers" />
    </div>
  );
}

export default MainContent;
