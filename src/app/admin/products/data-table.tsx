"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Column,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/DataTablePagination";
import { Search } from "lucide-react";
import TableActions from "@/components/admin/TableActions";
import DataTableSelectFilter from "@/components/ui/DataTableSelectFilter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const checkboxItems = [
  { value: "femme", text: "Femme" },
  { value: "homme", text: "Homme" },
  { value: "vip", text: "VIP" },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <Input
            placeholder="Rechercher un produit"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Search
            size={20}
            strokeWidth={1.5}
            className="relative right-8 text-muted-foreground"
          />
        </div>
        <div>
          <DataTableSelectFilter
            column={table.getColumn("sex") as Column<any, unknown>}
          />
          <DataTableSelectFilter
            column={table.getColumn("brandName") as Column<any, unknown>}
          />
          <DataTableSelectFilter
            column={table.getColumn("categoryName") as Column<any, unknown>}
          />
        </div>
        <div>
          <TableActions
            checkboxItems={checkboxItems}
            buttonText={`Ajouter produit`}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
