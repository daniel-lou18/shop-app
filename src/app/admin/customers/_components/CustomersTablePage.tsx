"use client";

import TableContainer from "@/components/admin/TableContainer";
import CustomersTableContent from "./CustomersTableContent";
import { User } from "@prisma/client";
import { UsersWithOrders } from "@/db/queries/users";

const tableHeaderItems = [
  { value: "lastName", text: "Nom" },
  { value: "firstName", text: "Prénom" },
  { value: "sex", text: "Genre" },
  { value: "isActive", text: "Statut" },
  { value: "orders", text: "Commandes" },
  { value: "total", text: "Montant total" },
];

const tabsTriggers = [
  { value: "all", text: "Tous" },
  { value: "active", text: "Actifs" },
  { value: "non-active", text: "Non-actifs" },
];

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
        tableHeaderItems={tableHeaderItems}
        data={data}
        tabsTriggers={tabsTriggers}
        filterFunction={filterCustomers}
      >
        <CustomersTableContent data={data} />
      </TableContainer>
    </div>
  );
}

export default CustomersTablePage;
