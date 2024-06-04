import { ReactNode } from "react";
import Orders from "./_components/Orders";
import OrderSummary from "./[id]/page";

async function CustomerOrders({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      <Orders />
      {children}
    </div>
  );
}

export default CustomerOrders;
