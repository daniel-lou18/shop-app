import Image from "next/image";
import { ReactNode } from "react";

type BannerProps = {
  children?: ReactNode;
  data: {
    title?: string;
    name: string;
    description?: string;
    imagePath: string;
  };
  className?: string;
};

function Banner({ children, data, className }: BannerProps) {
  const { title, name, description, imagePath } = data;
  return (
    <section className={className}>
      <div className="w-full h-1/3 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-950 opacity-20" />
        <p className="absolute left-0 top-0 text-white flex flex-col gap-4 px-12 py-8 text-3xl font-bold uppercase">
          {title}
        </p>
        <Image
          src={imagePath}
          width={1280}
          height={420}
          className="w-full h-full object-cover"
          alt="main hero image"
        />
        <div className="absolute left-0 bottom-0 text-white flex flex-col gap-4 px-12 py-6">
          <p className="text-5xl font-bold">{name}</p>
          <p className="hidden lg:block text-xl">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default Banner;
