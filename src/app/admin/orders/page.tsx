import { fetchAllOrders } from "@/db/queries/orders";
import OrdersTablePage from "./_components/OrdersTablePage";

async function AdminOrders() {
  const result = await fetchAllOrders();
  if (!result.success) throw new Error(result.error);

  return <OrdersTablePage data={result.data} />;
}

export default AdminOrders;
