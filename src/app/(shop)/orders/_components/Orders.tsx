import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/auth";
import { fetchOrdersbyUserId } from "@/db/queries/orders";
import Order from "./Order";
async function Orders() {
  const session = await auth();
  const user = session?.user;
  const orders = await fetchOrdersbyUserId(user?.id);
  if (!orders.success) throw new Error(orders.error);

  return (
    <Card className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <CardHeader className="px-7">
        <CardTitle>Commandes</CardTitle>
        <CardDescription>
          Cliquez sur une commande pour voir le détail
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° commande</TableHead>
              <TableHead className="hidden sm:table-cell">Produit(s)</TableHead>
              <TableHead className="hidden sm:table-cell">Statut</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <Order key={order.id} orderId={order.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Orders;
