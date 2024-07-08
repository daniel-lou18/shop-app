import { ReactNode, Suspense } from "react";
import HeaderCustomer from "./_components/HeaderCustomer";
import { CartContextProvider } from "@/context/cart-context";
import Topbar from "./_components/Topbar";
import Footer from "./_components/Footer";
import { WishlistContextProvider } from "@/context/wishlist-context";
import { auth } from "@/auth";

async function CustomerLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <CartContextProvider>
      <WishlistContextProvider user={session?.user}>
        <Topbar />
        <HeaderCustomer />
        {/* <Navbar /> */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </WishlistContextProvider>
    </CartContextProvider>
  );
}

export default CustomerLayout;
