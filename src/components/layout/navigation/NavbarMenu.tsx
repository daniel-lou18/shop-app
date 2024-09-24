import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/layout/navigation/navigation-menu";
import SubNav from "./SubNav";
import { navigationInitialData } from "@/lib/constants";
import Image from "next/image";

export function NavbarMenu({
  data,
}: {
  data: (typeof navigationInitialData)[number];
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger asChild>
        <Link href={`/store/${data.id}`} className="uppercase text-sm m-0">
          {data.name}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-16 px-16 py-10 md:w-[400px] lg:w-screen lg:grid-cols-[1fr_1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          {data.sections.map((section) => (
            <SubNav key={section.id} section={section} />
          ))}
          {data.featured.map((feature, idx) => (
            <li
              key={feature.name}
              className={`flex items-center ${idx > 1 && "hidden xl:flex"}`}
            >
              <div key={feature.name} className="group relative text-sm">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.name}
                    className="object-cover object-center"
                    width={400}
                    height={400}
                  />
                </div>
                <a
                  href={feature.href}
                  className="mt-6 block font-medium text-gray-900"
                >
                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                  {feature.name}
                </a>
                <p aria-hidden="true" className="mt-1">
                  Découvrir
                </p>
              </div>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
