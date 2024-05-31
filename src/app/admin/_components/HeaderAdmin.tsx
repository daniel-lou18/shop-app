import Link from "next/link";
import { Menu, Package2, Search, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { paths } from "@/lib/paths";
import HeaderAdminDropdown from "./HeaderAdminDropdown";
import HeaderLogo from "@/components/ui/HeaderLogo";

function HeaderAdmin() {
  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background p-4 sm:px-16 sm:py-0">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <HeaderLogo href={paths.customerHome()} />
        <Link
          href={paths.adminHome()}
          className="ml-4 text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground pointer-events-none"
        >
          Commandes
        </Link>
        <Link
          href={paths.adminProducts()}
          className="text-foreground transition-colors hover:text-foreground"
        >
          Produits
        </Link>
        <Link
          href={paths.adminCustomers()}
          className="text-foreground transition-colors hover:text-foreground"
        >
          Clients
        </Link>
        <Link
          href={paths.adminSettingsAccount()}
          className="text-foreground transition-colors hover:text-foreground"
        >
          Paramètres
        </Link>
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
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Commandes
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Produits
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Clients
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher produits..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <HeaderAdminDropdown />
      </div>
    </header>
  );
}

export default HeaderAdmin;
