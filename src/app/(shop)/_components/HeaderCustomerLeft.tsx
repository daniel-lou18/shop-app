import { Shirt, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

function HeaderCustomerLeft() {
  return (
    <div className="w-[30%]">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Shirt strokeWidth={1.5} size={32} />
        <span className="">Shop App</span>
      </Link>
    </div>
  );
}

export default HeaderCustomerLeft;
