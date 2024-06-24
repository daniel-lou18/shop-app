import { ExtendedOrderItem, OrderWithItems } from "@/db/queries/orders";
import { centsToEuros } from "@/helpers/helpers";

function OrderSummaryItem({ item }: { item: ExtendedOrderItem }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">
        {item.variant.product.brand.name} {" - "}{" "}
        {item.variant.product.name.split(" ")[0]} {item.variant.color}
        {"  "}
        {item.variant.size}
        <span>{` x ${item.quantity}`}</span>
      </span>
      <span>{centsToEuros(item.variant.price * item.quantity)}</span>
    </li>
  );
}

export default OrderSummaryItem;
