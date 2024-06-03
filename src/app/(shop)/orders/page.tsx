import Orders from "./_components/Orders";
import OrderSummary from "./_components/OrderSummary";

async function CustomerSettingsOrders() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      <Orders />
      <OrderSummary />
    </div>
  );
}

export default CustomerSettingsOrders;
