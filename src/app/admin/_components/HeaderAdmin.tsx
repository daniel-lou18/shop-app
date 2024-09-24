import Link from "next/link";
import { Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { paths } from "@/lib/paths";
import HeaderAdminDropdown from "./HeaderAdminDropdown";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { headerAdminLinks } from "@/lib/constants";
import NavLink from "@/components/layout/navigation/NavLink";

function HeaderAdmin() {
  return (
    <header className="sticky z-10 top-0 flex h-16 items-center justify-between gap-4 border-b bg-background p-4 sm:px-16 sm:py-0">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <HeaderLogo href={paths.customerHome()} />
        <Link
          href={paths.adminHome()}
          className="ml-4 text-base font-semibold text-muted-foreground transition-colors hover:text-foreground pointer-events-none"
        >
          Dashboard
        </Link>
        {headerAdminLinks.map((link, idx) => {
          if (idx === 0) return null;
          return (
            <NavLink href={link.href} key={link.text}>
              {link.text}
            </NavLink>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Shop App</span>
            </Link>
            <Link href="#" className="hover:text-foreground">
              Dashboard
            </Link>
            {headerAdminLinks.map((link, idx) => {
              if (idx === 0) return null;
              return (
                <NavLink href={link.href} key={link.text}>
                  {link.text}
                </NavLink>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <HeaderAdminDropdown />
      </div>
    </header>
  );
}

export default HeaderAdmin;
