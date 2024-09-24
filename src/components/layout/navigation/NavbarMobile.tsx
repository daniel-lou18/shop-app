"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { useState } from "react";
import { createNavigationData } from "@/lib/helpers";
import NavbarMobileSheet from "./NavbarMobileSheet";

function NavbarMobile({
  data,
}: {
  data: ReturnType<typeof createNavigationData>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!data?.length) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <HeaderLogo className="mb-4" />
          <Link href="/products/categories/new">NOUVEAUTÉS</Link>
          {data.map((dataElement) => (
            <NavbarMobileSheet
              key={dataElement.id}
              data={dataElement}
              setIsOpen={setIsOpen}
            />
          ))}
          <Link href="/products/categories/special-offers">PROMOTIONS</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobile;
