function OrderSummaryItem({ item }: { item: any }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">
        {item.name} x <span>{item.quantity}</span>
      </span>
      <span>{item.price}</span>
    </li>
  );
}

export default OrderSummaryItem;
