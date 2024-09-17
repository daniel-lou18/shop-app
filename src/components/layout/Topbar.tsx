"use client";

import { useCart } from "@/context/cart-context";
import { mapCartPriceToMessage } from "@/helpers/helpers";
import React from "react";

function Topbar() {
  const { totalPrice } = useCart();

  const message = mapCartPriceToMessage(totalPrice);

  return (
    <section className="text-white bg-primary w-full h-10 flex gap-2 justify-center items-center">
      <span>{message}</span>
    </section>
  );
}

export default Topbar;
