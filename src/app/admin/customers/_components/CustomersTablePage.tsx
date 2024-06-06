"use client";

import TableContainer from "@/components/admin/TableContainer";
import CustomersTableContent from "./CustomersTableContent";
import { User } from "@prisma/client";
import { UsersWithOrders } from "@/db/queries/users";
import {
  tableHeaderItemsCustomers,
  tabsTriggersCustomers,
} from "@/helpers/constants";
import { useState } from "react";
import Loader from "@/components/ui/Loader";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [orderedData, setOrderedData] = useState<UsersWithOrders>(data);

  async function handleSort(searchParams: string) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`/api/users?${searchParams}`);
      const data = await res.json();
      if (!res.ok) {
        if (data?.error) throw new Error(data.error);
        else
          throw new Error(
            "Une erreur est survenue lors de la récupération des produits"
          );
      }
      setOrderedData(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Une erreur est survenue");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

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
        <CustomersTableContent data={orderedData} />
      </TableContainer>
    </div>
  );
}

export default CustomersTablePage;
