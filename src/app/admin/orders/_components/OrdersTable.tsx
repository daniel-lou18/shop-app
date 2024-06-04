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
import PageItemsCounter from "@/components/ui/PageItemsCounter";
import { Suspense } from "react";
import TableTabsList from "@/components/admin/TableTabsList";
import TableActions from "@/components/admin/TableActions";
import TableHeaderRow from "@/components/admin/TableHeaderRow";
import { useState } from "react";
import { OrdersWithItemsAndUser } from "@/db/queries/orders";
import OrdersTableContent from "./OrdersTableContent";

const tabsTriggers = [
  { value: "all", text: "Tous" },
  { value: "paid", text: "Payées" },
  { value: "cancelled", text: "Annulées" },
];

const checkboxItems = [
  { value: "femme", text: "Femme" },
  { value: "homme", text: "Homme" },
  { value: "vip", text: "VIP" },
];

function filterCustomers(orders: OrdersWithItemsAndUser, value: string) {
  return orders.filter((order) => {
    switch (value) {
      case "paid":
        return order.isPaid;
      case "cancelled":
        return !order.isPaid;
      default:
        return order;
    }
  });
}

const tableHeaderItems = [
  "Nom",
  "Prénom",
  "Genre",
  "Email",
  "Statut",
  "Date",
  "Montant",
];
function OrdersTable({ orders }: { orders: OrdersWithItemsAndUser }) {
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
            <CardTitle>Commandes</CardTitle>
            <CardDescription>
              Gérer les commandes payées et non-payées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeaderRow tableHeaderItems={tableHeaderItems} />
              <OrdersTableContent orders={filterCustomers(orders, value)} />
            </Table>
          </CardContent>
          <CardFooter>
            <PageItemsCounter
              currentPage={1}
              itemsPerPage={10}
              totalItems={orders.length}
              text="clients"
            />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default OrdersTable;
