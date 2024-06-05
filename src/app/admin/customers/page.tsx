import { fetchUsers } from "@/db/queries/users";
import CustomersTablePage from "./_components/CustomersTablePage";

async function CustomersTable() {
  const result = await fetchUsers();
  if (!result.success) throw new Error(result.error);

  return <CustomersTablePage data={result.data} />;
}

export default CustomersTable;
