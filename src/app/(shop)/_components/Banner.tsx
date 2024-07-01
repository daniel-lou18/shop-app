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

  if (!name || !imagePath) return null;

  return (
    <section className={className}>
      <div className="w-full h-[550px] relative mt-12">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-950 opacity-20" />
        <p className="absolute left-0 top-0 text-white flex flex-col gap-4 px-12 py-8 md:text-2xl font-bold uppercase">
          {title}
        </p>
        <Image
          src={imagePath}
          width={1280}
          height={420}
          className="w-full h-full object-cover object-[10%]"
          alt="main hero image"
        />
        <div className="absolute left-0 bottom-0 text-white flex flex-col gap-4 px-12 py-6">
          <p className="md:text-2xl lg:text-4xl xl:text-5xl font-bold">
            {name}
          </p>
          <p className="hidden lg:block md:text-xl">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default Banner;
