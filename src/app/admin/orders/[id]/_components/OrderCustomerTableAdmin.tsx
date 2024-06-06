"use client";

import CustomersTableContent from "@/app/admin/customers/_components/CustomersTableContent";
import TableHeaderRow from "@/components/admin/TableHeaderRow";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { UserWithOrders } from "@/db/queries/users";
import { tableHeaderItemsCustomers } from "@/helpers/constants";

function OrderCustomerTableAdmin({ user }: { user: UserWithOrders }) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Client</CardTitle>
        <CardDescription>Informations personnelles du client</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeaderRow tableHeaderItems={tableHeaderItemsCustomers} />
          <CustomersTableContent data={[user]} />
        </Table>
      </CardContent>
    </Card>
  );
}

export default OrderCustomerTableAdmin;
