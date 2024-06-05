"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PageItemsCounter from "../ui/PageItemsCounter";
import { Suspense } from "react";
import TableTabsList from "@/components/admin/TableTabsList";
import TableActions from "@/components/admin/TableActions";
import TableHeaderRow from "@/components/admin/TableHeaderRow";
import CustomersTableContent from "@/app/admin/customers/_components/CustomersTableContent";
import { User } from "@prisma/client";
import { useState } from "react";

const tabsTriggers = [
  { value: "all", text: "Tous" },
  { value: "active", text: "Actifs" },
  { value: "non-active", text: "Non-actifs" },
];

const checkboxItems = [
  { value: "femme", text: "Femme" },
  { value: "homme", text: "Homme" },
  { value: "vip", text: "VIP" },
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

const tableHeaderItems = ["Prénom", "Genre", "Statut", "Commandes", "Total"];
function TableTabs({ customers }: { customers: User[] }) {
  const [value, setValue] = useState<string>("all");

  return (
    <Tabs value={value} onValueChange={setValue}>
      <div className="flex items-center">
        <TableTabsList tabsTriggers={tabsTriggers} />
        <Suspense>
          <TableActions
            checkboxItems={checkboxItems}
            buttonText="Ajouter client"
          />
        </Suspense>
      </div>
      <TabsContent value={value} className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
            <CardDescription>
              Gérer les utilisateurs actifs en non-actifs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeaderRow tableHeaderItems={tableHeaderItems} />
              <CustomersTableContent data={filterCustomers(customers, value)} />
            </Table>
          </CardContent>
          <CardFooter>
            <PageItemsCounter
              currentPage={1}
              itemsPerPage={10}
              totalItems={customers.length}
              text="clients"
            />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TableTabs;
