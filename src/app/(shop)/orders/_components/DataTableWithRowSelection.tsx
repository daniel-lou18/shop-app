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
  getFacetedUniqueValues,
  FilterFn,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/admin/DataTablePagination";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";

export type DataTableConfig = {
  title: string;
  description: string;
  portalContainerId: string;
  searchInputPlaceholder: string;
  filterColumnIds: string;
};

export interface DataTableProps<TData, TValue> {
  config: DataTableConfig;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const multiColumnFilter: FilterFn<any> = (
  row,
  columnIds: string,
  filterValue,
  addMeta
) => {
  const columnIdsArray = columnIds.split(",");
  return columnIdsArray.some((columnId) => {
    const cellValue = row.getValue(columnId);
    return cellValue
      ?.toString()
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });
};

export function DataTableWithRowSelection<TData, TValue>({
  config: {
    title,
    description,
    portalContainerId,
    searchInputPlaceholder,
    filterColumnIds,
  },
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({
    0: true,
  });
  const [isMounted, setIsMounted] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    filterFns: {
      multiColumn: multiColumnFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _, value, addMeta) =>
      multiColumnFilter(row, filterColumnIds, value, addMeta),
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const searchInput = (
    <>
      <Input
        placeholder={searchInputPlaceholder}
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className="min-w-[400px] max-w-[500px]"
      />
      <Search
        size={20}
        strokeWidth={1.5}
        className="absolute right-2 text-muted-foreground"
      />
    </>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description} </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            {createPortal(
              searchInput,
              document.getElementById(portalContainerId)!
            )}
          </div>
          <div>
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
      </CardContent>
    </Card>
  );
}
