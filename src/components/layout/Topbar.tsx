"use client";

import { useCart } from "@/context/cart-context";
import { mapCartPriceToMessage } from "@/lib/helpers";
import React from "react";
import BaseComponent from "../ui/BaseComponent";

function Topbar() {
  const { totalPrice } = useCart();

  const message = mapCartPriceToMessage(totalPrice);

  return (
    <section className="text-white text-sm md:text-base bg-primary w-full h-10 flex gap-2 justify-center items-center">
      <BaseComponent tag="span" className="hidden sm:inline">
        {message}
      </BaseComponent>
      <BaseComponent tag="span" className="sm:hidden">
        {message?.split("sur toute")[0]}
      </BaseComponent>
    </section>
  );
}

export default Topbar;
