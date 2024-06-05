import { TableBody } from "@/components/ui/table";
import OrdersTableItem from "./OrdersTableItem";
import { OrdersWithItems, OrdersWithItemsAndUser } from "@/db/queries/orders";

type OrdersTableContentProps = {
  data: OrdersWithItemsAndUser;
};

function OrdersTableContent({ data }: OrdersTableContentProps) {
  return (
    <TableBody>
      {data.length > 0 &&
        data.map((order) => <OrdersTableItem order={order} key={order.id} />)}
    </TableBody>
  );
}

export default OrdersTableContent;
