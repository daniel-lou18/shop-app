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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { CircleUser, ShoppingBasket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

function HeaderCustomerRight() {
  const session = useSession();

  return (
    <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4 w-1/3">
      <form className="flex-1 sm:flex-initial hidden xl:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={actions.signOut} className="w-full">
              <button type="submit" className="w-full flex justify-start">
                Logout
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingBasket strokeWidth={1.25} size={28} />
            <span className="sr-only">Toggle panier</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={actions.signOut} className="w-full">
              <button type="submit" className="w-full flex justify-start">
                Logout
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderCustomerRight;
