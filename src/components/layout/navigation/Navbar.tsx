"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/layout/navigation/navigation-menu";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { navigationInitialData } from "@/helpers/constants";
import { createNavigationData } from "@/helpers/helpers";
import { AllCategories } from "@/db/queries/categories";
import { useEffect, useRef, useState } from "react";
import { AllBrands } from "@/db/queries/brands";
import { NavbarMenu } from "./NavbarMenu";
import NavbarEmpty from "./NavbarEmpty";

type NavbarData = {
  categoriesWomen: AllCategories;
  categoriesMen: AllCategories;
  brandsWomen: AllBrands;
  brandsMen: AllBrands;
};

export default function Navbar({ fetchedData }: { fetchedData: NavbarData }) {
  const hasRun = useRef<boolean>(false);
  const [data, setData] = useState<typeof navigationInitialData>([]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const navigationData = createNavigationData(
      [
        {
          dataId: "femme",
          sections: [
            {
              id: "categories",
              name: "Catégories",
              items: [...fetchedData.categoriesWomen],
            },
            {
              id: "brands",
              name: "Marques",
              items: [...fetchedData.brandsWomen],
            },
          ],
        },
        {
          dataId: "homme",
          sections: [
            {
              id: "categories",
              name: "Catégories",
              items: [...fetchedData.categoriesMen],
            },
            {
              id: "brands",
              name: "Marques",
              items: [...fetchedData.brandsMen],
            },
          ],
        },
      ],
      navigationInitialData
    );
    setData(navigationData);
  }, [fetchedData]);

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
