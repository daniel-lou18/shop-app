import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeString } from "@/lib/parsers";
import { navigationInitialData } from "@/lib/constants";
import { Dispatch, SetStateAction } from "react";
import { paths } from "@/lib/paths";

type NavbarMobileSheetProps = {
  data: (typeof navigationInitialData)[number];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function NavbarMobileSheet({ data, setIsOpen }: NavbarMobileSheetProps) {
  const { id, name, featured, sections } = data;

  if (!id || !name || !sections?.length) return null;

  return (
    <Sheet modal={false}>
      <SheetTrigger className="pl-0 text-lg w-full flex gap-2 justify-between md:justify-center items-center">
        <span className="uppercase">{name}</span>
        <span>
          <ChevronRight size={18} strokeWidth={1} />
        </span>
      </SheetTrigger>
      <SheetContent side="left" className="left-transparent">
        <p className="font-bold text-primary mb-4">
          Shop App {">"} {capitalizeString(name)}
        </p>
        <Link
          href={paths.storeSex(id)}
          className="block w-full py-4 font-medium border-b"
          onClick={() => setIsOpen(false)}
        >
          Voir tout
        </Link>
        <Accordion type="single" collapsible>
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger>{section.name}</AccordionTrigger>
              <AccordionContent>
                {section.items.map((item) => (
                  <Link
                    href={
                      section.id === "categories"
                        ? paths.storeCategory(item.sex, item.name)
                        : paths.storeBrand(item.sex, item.name)
                    }
                    className="block w-full py-2 uppercase"
                    key={item.id}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobileSheet;
