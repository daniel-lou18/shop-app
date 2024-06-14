import { fetchAllOrders } from "@/db/queries/orders";
import { columns } from "./columns";
import OrdersFilters from "./_components/OrdersFilters";
import { DataTable } from "@/components/admin/DataTable";

const config = {
  title: "Commandes",
  description: "Gérer les commandes des clients",
  portalContainerId: "orders-search-container",
  searchInputPlaceholder: "Rechercher par nom, prénom ou n° de commande",
  filterColumnIds: "id,firstName,lastName",
};

async function AdminOrders() {
  const result = await fetchAllOrders();
  if (!result.success) throw new Error(result.error);

  return (
    <>
      <OrdersFilters />
      <DataTable data={result.data} columns={columns} config={config} />
    </>
  );
}

export default AdminOrders;
