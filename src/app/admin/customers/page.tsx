import { fetchUsers } from "@/db/queries/users";
import TableTabs from "@/components/admin/TableTabs";

async function CustomersTable() {
  const result = await fetchUsers();
  if (!result.success) throw new Error(result.error);

  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8">
      <TableTabs customers={result.data} />
    </main>
  );
}

export default CustomersTable;
