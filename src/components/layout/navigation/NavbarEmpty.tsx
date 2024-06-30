import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/layout/navigation/navigation-menu";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/layout/navigation/navigation-menu";
import HeaderLogo from "@/components/ui/HeaderLogo";
function NavbarEmpty() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <HeaderLogo className="mr-8" />
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <Link href={`/store/homme`} className="uppercase text-sm m-0">
              Femme
            </Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <Link href={`/store/homme`} className="uppercase text-sm m-0">
              Homme
            </Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavbarEmpty;
