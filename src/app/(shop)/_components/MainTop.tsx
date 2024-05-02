import { paths } from "@/helpers/helpers";
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
];

function MainTop() {
  return (
    <div className="flex gap-4 sm:gap-8 justify-around">
      {data.map((item) => (
        <div key={item.id} className="relative w-[30vw] h-[40vw]">
          <Link href={paths.storeSex(item.name)}>
            <Image
              src={item.imagePath}
              alt={item.name}
              width={500}
              height={800}
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute uppercase text-5xl font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
              {item.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MainTop;
