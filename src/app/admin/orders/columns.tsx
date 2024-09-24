"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { DataTableColumnHeader } from "@/components/admin/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { OrderWithItemsAndUser } from "@/db/queries/orders";
import { calculateOrderPrice } from "@/lib/helpers";

export type OrdersTableData = OrderWithItemsAndUser;

export const columns: ColumnDef<OrdersTableData>[] = [
  {
    accessorKey: "orderItems.at(0)?.variant.images.at(0)",
    header: "",
    cell: ({ row }) => {
      const imagePath = row.original.orderItems.at(0)?.variant.images[0];
      return (
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={imagePath || "/placeholder.svg"}
          width="64"
        />
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="N° commande" />;
    },
  },
  {
    accessorFn: (row) => row.user.lastName,
    id: "lastName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
  },
  {
    accessorFn: (row) => row.user.firstName,
    id: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Prénom" />;
    },
  },
  {
    accessorFn: (row) => row.createdAt.toLocaleDateString(),
    id: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
  },
  {
    accessorKey: "isPaid",
    header: "Statut",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Badge
          variant="outline"
          className={`${order.isPaid ? "bg-green-200" : "bg-red-200"}`}
        >
          {order.isPaid ? "Payée" : "Annulée"}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) =>
      row.orderItems?.at(0)?.variant.product.brand.name +
      " - " +
      row.orderItems?.at(0)?.variant.product.name.split(" ").at(0) +
      "...",
    id: "itemNames",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Produit(s)" />;
    },
  },
  {
    accessorFn: (row) => calculateOrderPrice(row),
    id: "price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Prix" />;
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price")) / 100;
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={paths.adminOrder(order.id)}
                className="flex gap-2 items-center"
              >
                <Eye size={16} strokeWidth={1.25} /> Voir les détails
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 items-center">
              <Trash2 size={16} strokeWidth={1.25} /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
