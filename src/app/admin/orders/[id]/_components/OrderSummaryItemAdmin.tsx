import { ExtendedOrderItem, OrderWithItems } from "@/db/queries/orders";
import { centsToEuros } from "@/lib/helpers";

function OrderSummaryItemAdmin({ item }: { item: ExtendedOrderItem }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">
        {item.variant.product.brand.name} {" - "}{" "}
        {item.variant.product.name.split(" ")[0]} x <span>{item.quantity}</span>
      </span>
      <span>{centsToEuros(item.variant.price * item.quantity)}</span>
    </li>
  );
}

export default OrderSummaryItemAdmin;
