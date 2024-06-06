import CustomersTableContent from "@/app/admin/customers/_components/CustomersTableContent";
import ProductsTableHeader from "@/app/admin/products/_components/ProductsTableHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { UserWithOrders } from "@/db/queries/users";

function OrderCustomerTableAdmin({ user }: { user: UserWithOrders }) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Client</CardTitle>
        <CardDescription>Informations personnelles du client</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <ProductsTableHeader />
          <CustomersTableContent data={[user]} />
        </Table>
      </CardContent>
    </Card>
  );
}

export default OrderCustomerTableAdmin;
