import { paths } from "@/lib/paths";
import Link from "next/link";
import React from "react";

function Topbar() {
  return (
    <section className="text-white bg-primary w-full h-10 flex gap-2 justify-center items-center">
      <span>Retours gratuits sous 14 jours</span>
      {/* <span className="underline text-gray-200 hover:text-white hidden md:block">
        <Link href={paths.storeSex("femme")}>En savoir plus</Link>
      </span> */}
    </section>
  );
}

export default Topbar;
