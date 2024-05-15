"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeaderCustomerLeft from "@/app/(shop)/_components/HeaderCustomerLeft";
import { AllBrands } from "@/db/queries/brands";
import { AllCategories } from "@/db/queries/categories";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeString } from "@/lib/parsers";
import { useState } from "react";

type NavbarMobileProps = {
  categoriesMen: AllCategories;
  categoriesWomen: AllCategories;
  brandsMen: AllBrands;
  brandsWomen: AllBrands;
};

function NavbarMobile({
  categoriesMen,
  categoriesWomen,
  brandsMen,
  brandsWomen,
}: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          <HeaderCustomerLeft className="mb-4" />
          <Link href="/products/categories/new">NOUVEAUTÉS</Link>
          <Sheet modal={false}>
            <SheetTrigger className="pl-0 text-lg w-full flex gap-2 justify-between md:justify-center items-center">
              <span>HOMME</span>
              <span>
                <ChevronRight size={18} strokeWidth={1} />
              </span>
            </SheetTrigger>
            <SheetContent side="left" className="left-transparent">
              <p className="font-bold text-primary mb-4">
                Shop App {">"} HOMME
              </p>
              <Link
                href={`/store/homme-all/all`}
                className="block w-full py-4 font-medium border-b"
                onClick={() => setIsOpen(false)}
              >
                Voir tout
              </Link>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>CATÉGORIES</AccordionTrigger>
                  <AccordionContent>
                    {categoriesMen.map((category) => (
                      <Link
                        href={`/store/homme-${category.name}/all`}
                        className="block w-full py-2"
                        key={category.id}
                        onClick={() => setIsOpen(false)}
                      >
                        {capitalizeString(category.name)}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>MARQUES</AccordionTrigger>
                  <AccordionContent>
                    {brandsMen.map((brand) => (
                      <Link
                        href={`/store/homme-all/${brand.name}`}
                        className="block w-full py-2"
                        key={brand.id}
                        onClick={() => setIsOpen(false)}
                      >
                        {capitalizeString(brand.name)}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SheetContent>
          </Sheet>
          <Sheet modal={false}>
            <SheetTrigger className="pl-0 text-lg w-full flex gap-2 justify-between md:justify-center items-center">
              <span>FEMME</span>
              <span>
                <ChevronRight size={18} strokeWidth={1} />
              </span>
            </SheetTrigger>
            <SheetContent side="left" className="left-transparent">
              <p className="font-bold text-primary mb-4">
                Shop App {">"} FEMME
              </p>
              <Link
                href={`/store/femme-all/all`}
                className="block w-full py-4 font-medium border-b"
                onClick={() => setIsOpen(false)}
              >
                Voir tout
              </Link>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>CATÉGORIES</AccordionTrigger>
                  <AccordionContent>
                    {categoriesWomen.map((category) => (
                      <Link
                        href={`/store/femme-${category.name}/all`}
                        className="block w-full py-2"
                        key={category.id}
                        onClick={() => setIsOpen(false)}
                      >
                        {capitalizeString(category.name)}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>MARQUES</AccordionTrigger>
                  <AccordionContent>
                    {brandsWomen.map((brand) => (
                      <Link
                        href={`/store/femme-all/${brand.name}`}
                        className="block w-full py-2"
                        key={brand.id}
                        onClick={() => setIsOpen(false)}
                      >
                        {capitalizeString(brand.name)}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SheetContent>
          </Sheet>
          <Link href="/products/categories/special-offers">PROMOTIONS</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobile;
