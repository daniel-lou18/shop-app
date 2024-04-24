import { ReactNode } from "react";
import HeaderCustomer from "./_components/HeaderCustomer";

function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderCustomer />
      <div className="p-4 sm:px-16 sm:py-8 min-h-screen">{children}</div>
    </>
  );
}

export default CustomerLayout;
