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
} from "@/components/ui/navigation-menu";
import { AllCategories } from "@/db/queries/categories";
import { AllBrands } from "@/db/queries/brands";
import SubNav from "./SubNav";
import Image from "next/image";

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
  image,
}: {
  children: string;
  categories: AllCategories;
  brands: AllBrands;
  image: string;
}) {
  return (
    <NavigationMenuItem>
      <Link href={`/store/${children.toLowerCase()}-all/all`}>
        <NavigationMenuTrigger>{children.toUpperCase()}</NavigationMenuTrigger>
      </Link>
      <NavigationMenuContent>
        <ul className="grid gap-16 p-6 md:w-[400px] lg:w-[700px] lg:grid-cols-[1fr_1fr_1fr]">
          <li className="row-span-full">
            <Link
              href={`/store/${children.toLowerCase()}-all/all`}
              className="h-full"
            >
              <Image
                src={image}
                width={200}
                height={500}
                alt={children}
                className="h-full object-cover"
              />
            </Link>
          </li>
          <SubNav items={categories} title="Catégories">
            {children}
          </SubNav>
          <SubNav items={brands} title="Marques">
            {children}
          </SubNav>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
