import { ReactNode } from "react";
import HeaderCustomer from "./_components/HeaderCustomer";
import { CartContextProvider } from "@/context/cart-context";
import Topbar from "./_components/Topbar";

function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <Topbar />
      <HeaderCustomer />
      <main>{children}</main>
    </CartContextProvider>
  );
}

export default CustomerLayout;
