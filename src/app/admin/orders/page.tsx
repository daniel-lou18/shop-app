import { fetchAllOrders } from "@/db/queries/orders";
import { OrdersDataTable } from "./data-table";
import { columns } from "./columns";
import OrdersFilters from "./_components/OrdersFilters";

async function AdminOrders() {
  const result = await fetchAllOrders();
  if (!result.success) throw new Error(result.error);

  return (
    <>
      <OrdersFilters />
      <OrdersDataTable data={result.data} columns={columns} />
    </>
  );
}

export default AdminOrders;
