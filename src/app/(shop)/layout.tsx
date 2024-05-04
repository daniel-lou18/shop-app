import { ReactNode } from "react";
import HeaderCustomer from "./_components/HeaderCustomer";
import { CartContextProvider } from "@/context/cart-context";
import Topbar from "./_components/Topbar";

function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <Topbar />
      <HeaderCustomer />
      <div className="p-4 sm:px-16 sm:py-8 min-h-screen">{children}</div>
    </CartContextProvider>
  );
}

export default CustomerLayout;
