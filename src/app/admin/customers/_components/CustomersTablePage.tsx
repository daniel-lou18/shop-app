"use client";

import TableContainer from "@/components/admin/TableContainer";
import CustomersTableContent from "./CustomersTableContent";
import { User } from "@prisma/client";
import { UsersWithOrders } from "@/db/queries/users";
import {
  tableHeaderItemsCustomers,
  tabsTriggersCustomers,
} from "@/helpers/constants";

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
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <TableContainer
        title="Clients"
        subtitle="Gérer les utilisateurs actifs en non-actifs"
        tableHeaderItems={tableHeaderItemsCustomers}
        data={data}
        tabsTriggers={tabsTriggersCustomers}
        filterFunction={filterCustomers}
      >
        <CustomersTableContent data={data} />
      </TableContainer>
    </div>
  );
}

export default CustomersTablePage;
