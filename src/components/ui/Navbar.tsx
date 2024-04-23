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

export function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenu className="w-1/3">
      <NavigationMenuList className="gap-4">{children}</NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

export function NavLinkMenu({
  children,
  categories,
}: {
  children: string;
  categories: AllCategories;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{children}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
          <li className={`row-span-${categories.length}`}>
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/products"
              >
                <div className="mb-2 mt-4 text-lg font-medium">
                  Tous nos produits
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Des produits de qualité à des prix imbattables
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/products/categories/${category.name.toLowerCase()}-${children.toLowerCase()}`}
                className="font-medium border-b-2 border-solid border-transparent hover:border-gray-950 w-fit"
              >
                {category.name.at(0)?.toUpperCase() + category.name.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
