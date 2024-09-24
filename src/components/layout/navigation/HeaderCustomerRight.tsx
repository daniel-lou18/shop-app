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
import Example from "../../../app/(shop)/cart/_components/ShoppingCart";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { paths } from "@/lib/paths";
import ButtonSignOut from "@/components/ui/ButtonSignOut";
import { User } from "@prisma/client";
import Search from "../search/Search";
import BaseComponent from "@/components/ui/BaseComponent";
import { calculateTotalCartItems } from "@/lib/helpers";

type HeaderCustomerRightProps = {
  currentUser: User | null;
};

function HeaderCustomerRight({ currentUser }: HeaderCustomerRightProps) {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { items } = useCart();
  const totalCartItems = calculateTotalCartItems(items);

  function toggleCart() {
    setCartOpen((prevState) => !prevState);
  }

  return (
    <BaseComponent className="flex flex-1 sm:flex-initial items-center justify-end gap-4 md:gap-2 lg:gap-4 w-[60%] md:mr-16">
      <Search />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <CircleUser strokeWidth={1.25} size={28} />
            <span className="sr-only">Toggle utilisateur</span>
            {currentUser && <span className="user-connected bg-green-500" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {currentUser && currentUser.firstName
              ? `HELLO, ${currentUser.firstName} !`
              : "Mon compte"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currentUser && (
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
            <Link href={paths.adminSignIn()}>
              Espace pro
              <span className="font-semibold italic text-gray-500 ml-1">
                {" "}
                beta
              </span>
            </Link>
          </DropdownMenuItem>
          {!currentUser && (
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={paths.customerSignUp()}>Créer un compte</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {!currentUser && (
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={paths.customerSignIn()}>Se connecter</Link>
            </DropdownMenuItem>
          )}
          {currentUser && (
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
          <span className="cart-count bg-primary">{totalCartItems}</span>
        )}
      </Button>
      <Example open={cartOpen} setOpen={setCartOpen} />
    </BaseComponent>
  );
}

export default HeaderCustomerRight;
