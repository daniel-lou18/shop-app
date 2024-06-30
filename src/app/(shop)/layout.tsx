import { ReactNode, Suspense } from "react";
import HeaderCustomer from "./_components/HeaderCustomer";
import { CartContextProvider } from "@/context/cart-context";
import Topbar from "./_components/Topbar";
import Footer from "./_components/Footer";

function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <Topbar />
      <HeaderCustomer />
      {/* <Navbar /> */}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </CartContextProvider>
  );
}

export default CustomerLayout;
