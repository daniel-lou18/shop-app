import { TableBody } from "@/components/ui/table";
import OrdersTableItem from "./OrdersTableItem";
import { OrdersWithItems, OrdersWithItemsAndUser } from "@/db/queries/orders";

type OrdersTableContentProps = {
  orders: OrdersWithItemsAndUser;
};

function OrdersTableContent({ orders }: OrdersTableContentProps) {
  return (
    <TableBody>
      {orders.length > 0 &&
        orders.map((order) => <OrdersTableItem order={order} key={order.id} />)}
    </TableBody>
  );
}

export default OrdersTableContent;
