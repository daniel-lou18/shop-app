import PageHeading1 from "@/components/ui/PageHeading1";
import { paths } from "@/lib/paths";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const data = [
  {
    id: 1,
    name: "femme",
    imagePath: "/femme_home.jpg",
  },
  {
    id: 2,
    name: "homme",
    imagePath: "/homme_home.jpg",
  },
  {
    id: 3,
    name: "nouveautés",
    imagePath: "/MIXTE_BANNIERE_PREMIUM_DESKTOP.jpg",
  },
];

function MainTop() {
  return (
    <section className="mt-4 md:mt-24">
      <PageHeading1>Tous les articles</PageHeading1>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="relative h-60 md:h-[25vw]">
            <Link href={paths.storeSex(item.name)}>
              <Image
                src={item.imagePath}
                alt={item.name}
                width={500}
                height={800}
                className="w-full h-full object-cover brightness-90 object-top rounded-md"
              />
              <div className="absolute uppercase sm:text-xl lg:text-3xl xl:text-4xl font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                {item.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MainTop;
