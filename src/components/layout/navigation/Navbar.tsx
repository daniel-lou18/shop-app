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
import { AllCategories } from "@/db/queries/categories";
import { AllBrands } from "@/db/queries/brands";
import SubNav from "./SubNav";
import Image from "next/image";
import { MenuImages } from "@/types";

export function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">{children}</NavigationMenuList>
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
  children,
  categories,
  brands,
  images,
}: {
  children: string;
  categories: AllCategories;
  brands: AllBrands;
  images: MenuImages;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger asChild>
        <Link
          href={`/store/${children.toLowerCase()}`}
          className="uppercase text-sm"
        >
          {children}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-16 px-16 py-10 md:w-[400px] lg:w-screen lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          <SubNav items={categories} title="Catégories">
            {children}
          </SubNav>
          <SubNav items={brands} title="Marques">
            {children}
          </SubNav>
          {images.map((image, idx) => (
            <li key={idx} className="flex items-center">
              <div key={image.name} className="group relative text-sm">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <Image
                    src={image.imageSrc}
                    alt={image.name}
                    className="object-cover object-center"
                    width={400}
                    height={400}
                  />
                </div>
                <a
                  href={image.href}
                  className="mt-6 block font-medium text-gray-900"
                >
                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                  {image.name}
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
