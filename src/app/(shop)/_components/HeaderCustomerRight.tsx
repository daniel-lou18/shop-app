"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { CircleUser } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import Example from "./ShoppingCart";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { paths } from "@/lib/paths";

function HeaderCustomerRight() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const session = useSession();
  const { items } = useCart();

  function toggleCart() {
    setCartOpen((prevState) => !prevState);
  }

  return (
    <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4 w-[30%]">
      <form className="flex-1 sm:flex-initial hidden xl:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher products..."
            className="pl-8 sm:w-[200px] md:w-[150px] lg:w-[200px]"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CircleUser strokeWidth={1.25} size={28} />
            <span className="sr-only">Toggle utilisateur</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Préférences</DropdownMenuItem>
          <DropdownMenuItem>Aide</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={paths.login()}>Espace pro</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={actions.signOut} className="w-full">
              <button
                type="submit"
                className="w-full flex justify-start opacity-50"
                disabled
              >
                Connexion
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full relative"
        onClick={toggleCart}
      >
        <ShoppingBagIcon strokeWidth={1.25} className="h-7 w-7" />
        <span className="sr-only">Toggle panier</span>
        {items.length > 0 && (
          <span className="cart-count bg-primary">{items.length}</span>
        )}
      </Button>
      <Example open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
}

export default HeaderCustomerRight;
