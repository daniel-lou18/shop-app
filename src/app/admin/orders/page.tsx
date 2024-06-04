import { fetchAllOrders } from "@/db/queries/orders";
import OrdersTable from "./_components/OrdersTable";

async function AdminOrders() {
  const result = await fetchAllOrders();
  if (!result.success) throw new Error(result.error);

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <OrdersTable orders={result.data} />
    </div>
  );
}

export default AdminOrders;
