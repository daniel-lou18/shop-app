"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductsTableItemProps } from "../../../components/ui/v1/ProductsTableItem";
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

export type ProductsTableData = ProductsTableItemProps;

export const columns: ColumnDef<ProductsTableData>[] = [
  {
    accessorKey: "variants.0.images.0",
    header: "",
    cell: ({ row }) => {
      const imagePath = row.original.variants.at(0)?.images[0];
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
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom produit" />;
    },
  },
  {
    accessorFn: (row) => row.brand.name,
    id: "brandName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Marque" />;
    },
  },
  {
    accessorFn: (row) => row.category.name,
    id: "categoryName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Catégorie" />;
    },
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Collection" />;
    },
  },
  {
    accessorKey: "isActive",
    header: "Statut",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Badge
          variant={`${
            product.isActive || !product.isArchived ? "outline" : "secondary"
          }`}
          className={`${product.isActive ? "bg-green-200" : ""}`}
        >
          {product.isActive
            ? "Actif"
            : product.isArchived
            ? "Archivé"
            : "Brouillon"}{" "}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
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
    accessorKey: "totalStock",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Stock" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

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
                href={paths.adminProduct(product.id)}
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
