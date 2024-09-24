"use client";

import TableContainer from "@/components/admin/TableContainer";
import CustomersTableContent from "../../../app/admin/customers/_components/CustomersTableContent";
import { User } from "@prisma/client";
import { UsersWithOrders } from "@/db/queries/users";
import {
  tableHeaderItemsCustomers,
  tabsTriggersCustomers,
} from "@/lib/constants";
import Loader from "@/components/ui/Loader";
import { useSort } from "@/hooks/useSort";

function filterCustomers(customers: User[], value: string) {
  return customers.filter((customer) => {
    switch (value) {
      case "active":
        return customer.isActive;
      case "non-active":
        return !customer.isActive;
      default:
        return customer;
    }
  });
}

function CustomersTablePage({ data }: { data: UsersWithOrders }) {
  const { isLoading, error, orderedData, handleSort } = useSort(
    data,
    "/api/users"
  );

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      {isLoading && <Loader style="fullscreen" />}
      <TableContainer
        title="Clients"
        subtitle="Gérer les utilisateurs actifs en non-actifs"
        tableHeaderItems={tableHeaderItemsCustomers}
        data={orderedData}
        tabsTriggers={tabsTriggersCustomers}
        filterFunction={filterCustomers}
        handleSort={handleSort}
      >
        <CustomersTableContent data={orderedData as UsersWithOrders} />
      </TableContainer>
    </div>
  );
}

export default CustomersTablePage;
