"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/layout/navigation/navigation-menu";
import SubNav from "./SubNav";
import Image from "next/image";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { navigationInitialData } from "@/helpers/constants";

export function Navbar({ data }: { data: typeof navigationInitialData }) {
  if (!data?.length) return null;
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <HeaderLogo className="mr-8" />
        {data.map((dataElement) => (
          <NavLinkMenu key={dataElement.id} data={dataElement} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={className ? className : navigationMenuTriggerStyle()}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

export function NavLinkMenu({
  data,
}: {
  data: (typeof navigationInitialData)[number];
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger asChild>
        <Link href={`/store/${data.id}`} className="uppercase text-sm">
          {data.name}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-16 px-16 py-10 md:w-[400px] lg:w-screen lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          {data.sections.map((section) => (
            <SubNav key={section.id} section={section} />
          ))}
          {data.featured.map((feature) => (
            <li key={feature.name} className="flex items-center">
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
                  Shop now
                </p>
              </div>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
