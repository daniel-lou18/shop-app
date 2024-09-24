"use client";

import { useCart } from "@/context/cart-context";
import { mapCartPriceToMessage } from "@/lib/helpers";
import React from "react";

function Topbar() {
  const { totalPrice } = useCart();

  const message = mapCartPriceToMessage(totalPrice);

  return (
    <section className="text-white text-sm md:text-base bg-primary w-full h-10 flex gap-2 justify-center items-center">
      <span>{message}</span>
    </section>
  );
}

export default Topbar;
