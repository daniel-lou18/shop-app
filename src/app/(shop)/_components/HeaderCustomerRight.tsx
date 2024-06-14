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
import { CircleUser } from "lucide-react";
import React, { useState } from "react";
import Example from "./ShoppingCart";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { paths } from "@/lib/paths";
import ButtonSignOut from "@/components/ui/ButtonSignOut";
import { type ExtendedUser } from "@/auth";

type HeaderCustomerRightProps = {
  currentUser: ExtendedUser | undefined;
};

function HeaderCustomerRight({ currentUser }: HeaderCustomerRightProps) {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { items } = useCart();

  function toggleCart() {
    setCartOpen((prevState) => !prevState);
  }

  return (
    <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4 w-[30%]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CircleUser strokeWidth={1.25} size={28} />
            <span className="sr-only">Toggle utilisateur</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {!!currentUser ? "HELLO !" : "Mon compte"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!!currentUser && (
            <>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href={paths.customerSettingsAccount()}>Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href={paths.customerOrders()}>Mes commandes</Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href={paths.adminSignIn()}>Espace pro</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!currentUser && (
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={paths.customerSignIn()}>Se connecter</Link>
            </DropdownMenuItem>
          )}
          {!!currentUser && (
            <DropdownMenuItem>
              <ButtonSignOut />
            </DropdownMenuItem>
          )}
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
