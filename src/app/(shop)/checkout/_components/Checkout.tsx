"use client";

import { useCart } from "@/context/cart-context";
import React from "react";

function CheckoutPage() {
  const { items } = useCart();

  return <div>CheckoutPage</div>;
}

export default CheckoutPage;
