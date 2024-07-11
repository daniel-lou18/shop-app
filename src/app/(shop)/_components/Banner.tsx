"use client";

import Image from "next/image";
import { createContext, ReactNode, useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BannerData = {
  title?: string;
  name: string;
  description?: string;
  imagePath: string;
  buttonsData?: ButtonsData;
};

type BannerProps = {
  children?: ReactNode;
  className?: string;
  data: BannerData;
};

type ButtonsData = { name: string; href: string }[];

const BannerContext = createContext<BannerData | null>(null);

function useBanner() {
  const context = useContext(BannerContext);

  if (!context)
    throw new Error(
      "useBanner doit être utilisé à l'intérieur du composant Banner"
    );

  return context;
}

function Banner({ children, data, className }: BannerProps) {
  const { imagePath } = data;

  if (!imagePath) return null;

  return (
    <BannerContext.Provider value={{ ...data }}>
      <section className={className}>
        <div className="w-full h-[550px] relative mt-12">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-950 opacity-20" />
          <Image
            src={imagePath}
            width={1280}
            height={420}
            className="w-full h-full object-cover object-[10%]"
            alt="main hero image"
          />
          {children}
        </div>
      </section>
    </BannerContext.Provider>
  );
}

Banner.Header = function BannerHeader() {
  const { title } = useBanner();
  return (
    <p className="absolute left-0 top-0 text-white flex flex-col gap-4 px-12 py-8 md:text-2xl font-bold uppercase">
      {title}
    </p>
  );
};

Banner.Footer = function BannerFooter() {
  const { name, description } = useBanner();
  return (
    <div className="absolute left-0 bottom-0 text-white flex flex-col gap-4 px-12 py-6">
      <p className="md:text-2xl lg:text-4xl xl:text-5xl font-bold">{name}</p>
      <p className="hidden lg:block md:text-xl">{description}</p>
    </div>
  );
};

Banner.Buttons = function BannerButtons({ className }: { className?: string }) {
  const { buttonsData } = useBanner();

  if (!buttonsData?.length) return null;

  return (
    <div className={cn("flex gap-4 justify-end md:text-xl", className)}>
      {buttonsData.map(({ name, href }) => (
        <Button
          variant="outline"
          className="text-base min-w-32 bg-transparent rounded-sm text-white uppercase border-2"
          asChild
          key={name}
        >
          <Link href={href}>{name}</Link>
        </Button>
      ))}
    </div>
  );
};

Banner.Button = function BannerButton() {
  return (
    <Button
      variant="outline"
      className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-transparent text-white rounded-sm border-2"
    >
      En savoir plus
    </Button>
  );
};

export default Banner;
