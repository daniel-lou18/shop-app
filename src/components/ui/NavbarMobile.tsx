import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import HeaderCustomerLeft from "@/app/(shop)/_components/HeaderCustomerLeft";

function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <HeaderCustomerLeft />
          <Link
            href="/products/categories/new"
            className="text-muted-foreground hover:text-foreground"
          >
            Nouveautés
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Homme
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Femme
          </Link>
          <Link
            href="/products/categories/special-offers"
            className="hover:text-foreground"
          >
            Promotions
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobile;
