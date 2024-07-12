import Image from "next/image";
import { ReactNode } from "react";

type BannerTopProps = {
  children?: ReactNode;
  data: {
    title?: string;
    description: string;
    imagePath: string;
  };
  className?: string;
};

function BannerTop({ children, data, className }: BannerTopProps) {
  const { title, description, imagePath } = data;

  if (!imagePath) return null;

  return (
    <section className={className}>
      <div className="w-full h-[500px] relative">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-950 opacity-20" /> */}
        <p className="absolute left-0 top-0 text-white flex flex-col gap-4 px-12 py-8 md:text-3xl font-bold uppercase">
          {title}
        </p>
        <Image
          src={imagePath}
          width={1280}
          height={500}
          className="w-full h-full object-cover object-top"
          alt="main hero image"
          priority
        />
        <div className="absolute right-0 bottom-0 w-full sm:w-1/2 h-1/2 flex flex-col justify-between text-white px-12 pt-6 pb-12 text-right">
          <p className="text-2xl lg:text-4xl xl:text-5xl font-bold">
            {description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export default BannerTop;
