"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../badge";
import { Button } from "../button";
import { MoreHorizontal, User as UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { paths } from "@/lib/paths";
import { OrderWithItemsAndUser } from "@/db/queries/orders";
import { calculateOrderPrice, centsToEuros } from "@/helpers/helpers";
import { usePathname, useRouter } from "next/navigation";

type OrdersTableItemProps = { order: OrderWithItemsAndUser };

function OrdersTableItem({ order }: OrdersTableItemProps) {
  const router = useRouter();
  const pathName = usePathname();
  const {
    id,
    isPaid,
    createdAt,
    orderItems,
    user: { lastName, firstName, sex, email },
  } = order;

  function handleClick(e: React.MouseEvent<HTMLTableRowElement>) {
    e.preventDefault();
    router.push(`${pathName}/${order.id}`);
  }

  return (
    <TableRow onClick={handleClick} className="hover:cursor-pointer">
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={orderItems[0]?.variant.imagePath || "/placeholder.svg"}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell className="hidden md:table-cell">
        {createdAt.toLocaleDateString("fr-FR")}
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${isPaid ? "bg-green-200" : "bg-red-200"}`}
        >
          {isPaid ? "Payée" : "Annulée"}
        </Badge>
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        {orderItems[0]?.variant.product.brand.name.split(" ")[0]}
        {" - "}
        {orderItems[0]?.variant.product.name.split(" ")[0]}
        {"..."}
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        {centsToEuros(calculateOrderPrice(order))}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={paths.adminCustomerAccount(id)}>Modifier</Link>
            </DropdownMenuItem>
            <Suspense>{/* <OrdersTableItemDelete id={id} /> */}</Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default OrdersTableItem;
