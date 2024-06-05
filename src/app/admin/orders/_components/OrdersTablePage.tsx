"use client";

import TableContainer from "@/components/admin/TableContainer";
import OrdersTableContent from "./OrdersTableContent";
import { OrdersWithItemsAndUser } from "@/db/queries/orders";

const tableHeaderItems = [
  "N°",
  "Nom",
  "Prénom",
  "Date",
  "Statut",
  "Produits",
  "Montant",
];

const tabsTriggers = [
  { value: "all", text: "Tous" },
  { value: "paid", text: "Payées" },
  { value: "not-paid", text: "Annulées" },
];

function filterOrders(orders: OrdersWithItemsAndUser, value: string) {
  return orders.filter((order) => {
    switch (value) {
      case "paid":
        return order.isPaid;
      case "non-active":
        return !order.isPaid;
      default:
        return order;
    }
  });
}

function OrdersTablePage({ data }: { data: OrdersWithItemsAndUser }) {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <TableContainer
        title="Commandes"
        subtitle="Gérer les commandes payées et non-payées"
        tableHeaderItems={tableHeaderItems}
        data={data}
        tabsTriggers={tabsTriggers}
        filterFunction={filterOrders}
      >
        <OrdersTableContent data={data} />
      </TableContainer>
    </div>
  );
}

export default OrdersTablePage;
