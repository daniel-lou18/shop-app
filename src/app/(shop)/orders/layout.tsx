import { fetchAllOrders } from "@/db/queries/orders";
import { columns } from "./columns";
import { DataTable } from "@/components/admin/DataTable";
import TableActionsContainer from "@/components/admin/TableActionsContainer";
import { ReactNode } from "react";

const config = {
  title: "Commandes",
  description: "Consultez les détails de toutes vos commandes",
  portalContainerId: "customer-orders-search-container",
  searchInputPlaceholder: "Rechercher par n° de commande et articles",
  filterColumnIds: "id,itemNames",
};

async function CustomerOrdersPage({ children }: { children: ReactNode }) {
  const result = await fetchAllOrders();
  if (!result.success) throw new Error(result.error);

  return (
    <div className="p-4 sm:px-16 sm:py-4 bg-gray-50 min-h-screen">
      <TableActionsContainer portalContainerId="customer-orders-search-container" />
      <div className="grid gap-4 md:grid-cols-[1fr_425px] lg:gap-8">
        <DataTable data={result.data} columns={columns} config={config} />
        {children}
      </div>
    </div>
  );
}

export default CustomerOrdersPage;
