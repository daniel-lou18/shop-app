"use client";

import { useCart } from "@/context/cart-context";
import CartItem from "./CartItem";

function CartItems() {
  const { items } = useCart();

  return (
    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
      <div className="space-y-6">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CartItems;
