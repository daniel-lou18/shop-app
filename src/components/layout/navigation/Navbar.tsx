"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/layout/navigation/navigation-menu";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { createNavigationData } from "@/lib/helpers";
import { AllCategories } from "@/db/queries/categories";
import { useEffect, useRef } from "react";
import { AllBrands } from "@/db/queries/brands";
import { NavbarMenu } from "./NavbarMenu";
import NavbarEmpty from "./NavbarEmpty";

export type NavbarData = {
  categoriesWomen: AllCategories;
  categoriesMen: AllCategories;
  brandsWomen: AllBrands;
  brandsMen: AllBrands;
};

export default function Navbar({
  data,
}: {
  data: ReturnType<typeof createNavigationData>;
}) {
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
  }, [data]);

  if (!data?.length && !hasRun.current) return <NavbarEmpty />;
  if (!data?.length && hasRun.current) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <HeaderLogo className="mr-8" />
        {data.map((dataElement) => (
          <NavbarMenu key={dataElement.id} data={dataElement} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
