import { fetchUsersWithOrders } from "@/db/queries/users";
import CustomersFilters from "./_components/CustomersFilters";
import { CustomersDataTable } from "./data-table";
import { columns } from "./columns";

async function CustomersTable() {
  const result = await fetchUsersWithOrders();
  if (!result.success) throw new Error(result.error);

  return (
    <>
      <CustomersFilters />
      <CustomersDataTable data={result.data} columns={columns} />
    </>
  );
}

export default CustomersTable;
