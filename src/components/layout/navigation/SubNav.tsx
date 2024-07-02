import { capitalizeString } from "@/lib/parsers";
import { navigationInitialData } from "@/helpers/constants";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/layout/navigation/navigation-menu";
import { paths } from "@/lib/paths";

type SubNavProps = {
  section: (typeof navigationInitialData)[number]["sections"][number];
};

function SubNav({ section }: SubNavProps) {
  return (
    <li className="col-span-1">
      <ul className="grid gap-2">
        <h4 className="mb-2 font-semibold">{section.name}</h4>
        {section.items.map((item) => (
          <NavLink
            href={
              section.id === "categories"
                ? paths.storeCategory(item.sex, item.name)
                : paths.storeBrand(item.sex, item.name)
            }
            className="text-gray-500 text-sm hover:text-gray-950 w-fit"
            key={item.id}
          >
            {capitalizeString(item.name)}
          </NavLink>
        ))}
      </ul>
    </li>
  );
}

function NavLink({
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

export default SubNav;
