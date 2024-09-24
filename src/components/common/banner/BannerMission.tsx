"use client";

import React from "react";
import Banner from "./Banner";
import { oceanBanner } from "@/lib/constants";

export default function BannerMission() {
  return (
    <Banner data={oceanBanner} className="mt-8 md:mt-6">
      <Banner.Header />
      <Banner.Button />
      <Banner.Footer />
    </Banner>
  );
}
