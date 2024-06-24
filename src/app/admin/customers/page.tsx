import { fetchUsersWithOrders } from "@/db/queries/users";
import { columns } from "./columns";
import { DataTable } from "@/components/admin/DataTable";
import TableActionsContainer from "@/components/admin/TableActionsContainer";
import TableActions from "@/components/admin/TableActions";

const config = {
  title: "Clients",
  description:
    "Consulter et modifier les informations personnelles des clients",
  portalContainerId: "customers-search-container",
  searchInputPlaceholder: "Rechercher par nom ou prénom",
  filterColumnIds: "firstName,lastName",
};

async function CustomersTable() {
  const result = await fetchUsersWithOrders();
  if (!result.success) throw new Error(result.error);

  return (
    <>
      <TableActionsContainer portalContainerId="customers-search-container">
        <TableActions buttonText={`Ajouter client`} />
      </TableActionsContainer>
      <DataTable data={result.data} columns={columns} config={config} />
    </>
  );
}

export default CustomersTable;
