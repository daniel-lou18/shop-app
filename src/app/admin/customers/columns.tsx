"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2, User } from "lucide-react";

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
import { calculateOrderPrice, calculateOrdersPrice } from "@/lib/helpers";
import { UserWithOrders } from "@/db/queries/users";

export type UsersTableData = UserWithOrders;

export const columns: ColumnDef<UsersTableData>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const imagePath = row.original.image;
      return imagePath ? (
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={imagePath}
          width="64"
        />
      ) : (
        <User />
      );
    },
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
  },
  {
    accessorFn: (row) => row.firstName,
    id: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Prénom" />;
    },
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Genre" />;
    },
  },
  {
    accessorKey: "isPaid",
    header: "Statut",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge
          variant="outline"
          className={`${user.isActive ? "bg-green-200" : "bg-gray-200"}`}
        >
          {user.isActive ? "Actif" : "Non-actif"}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.orders.length,
    id: "orderCount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Commandes" />;
    },
  },
  {
    accessorFn: (row) => calculateOrdersPrice(row.orders),
    id: "totalAmount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Montant total" />;
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalAmount")) / 100;
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
      const customer = row.original;

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
                href={paths.adminCustomerAccount(customer.id)}
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
