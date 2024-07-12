"use client";

// I had to create a separate client component to wrap the Banner compound component, otherwise Next will throw an error when rendering it on the page server component

import { brandBanner } from "@/helpers/constants";
import Banner from "./Banner";

export default function BannerBrand() {
  return (
    <Banner data={brandBanner} className="mt-8 md:mt-6">
      <Banner.Header />
      <Banner.Buttons className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
      <Banner.Footer />
    </Banner>
  );
}
