import { ReactNode } from "react";
import HeaderCustomer from "./_components/HeaderCustomer";
import { CartContextProvider } from "@/context/cart-context";

function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <HeaderCustomer />
      <div className="p-4 sm:px-16 sm:py-8 min-h-screen">{children}</div>
    </CartContextProvider>
  );
}

export default CustomerLayout;
