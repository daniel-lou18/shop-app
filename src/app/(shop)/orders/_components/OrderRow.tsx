"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { OrderWithItems } from "@/db/queries/orders";
import { calculateOrderPrice, centsToEuros } from "@/helpers/helpers";
import { paths } from "@/lib/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
function OrderRow({ order }: { order: OrderWithItems }) {
  const router = useRouter();
  const totalPrice = calculateOrderPrice(order);

  function handleClick(e: React.MouseEvent<HTMLTableRowElement>) {
    e.preventDefault();
    router.push(paths.customerOrders(order.id));
  }
  return (
    <TableRow onClick={handleClick} className="hover:cursor-pointer">
      <TableCell>
        <Image
          src={
            order.orderItems[0].variant.product.imagePath || "/placeholder.svg"
          }
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          width="64"
        />
      </TableCell>
      <TableCell>{order.id}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {order.orderItems[0].variant.product.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {order.createdAt.toLocaleDateString("fr-FR")}
      </TableCell>
      <TableCell className="text-right">{totalPrice}</TableCell>
    </TableRow>
  );
}

export default OrderRow;
