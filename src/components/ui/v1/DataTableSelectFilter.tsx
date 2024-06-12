// import { Column, Row, RowData, Table } from "@tanstack/react-table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { ProductsTableData } from "@/app/admin/products/columns";

// type DataTableSelectFilterProps<TData> = {
//   table: Table<TData>;
//   column: Column<TData, unknown>;
//   title: string;
//   selectedSex: string;
//   setSelectedSex: Dispatch<SetStateAction<string>>;
// };

// function DataTableSelectFilter<TData extends ProductsTableData>({
//   table,
//   column,
//   title,
//   selectedSex,
//   setSelectedSex,
// }: DataTableSelectFilterProps<TData>) {
//   const [value, setValue] = useState<string>("all");
//   const preFilteredRows = table.getPreFilteredRowModel().rows;
//   function filterCondition(row: Row<TData>) {
//     if (selectedSex === "all") {
//       return true;
//     } else if (row.original.sex === selectedSex) {
//       return true;
//     }
//   }
//   const filteredRows = selectedSex
//     ? preFilteredRows.filter((row) => filterCondition(row))
//     : preFilteredRows;
//   const sortedUniqueValues = Array.from(
//     new Set(filteredRows.map((row) => row.getValue(column.id) as string))
//   ).sort();

//   useEffect(() => {
//     if (selectedSex === "all") {
//       setValue("all");
//     } else {
//       setValue((prevValue) => {
//         if (sortedUniqueValues.find((value) => value === prevValue))
//           return prevValue;
//         else return "all";
//       });
//     }
//   }, [selectedSex, sortedUniqueValues]);

//   function handleValueChange(value: string) {
//     setValue(value);
//     if (value === "all") {
//       column.setFilterValue("");
//     } else {
//       column.setFilterValue(value);
//       setSelectedSex(
//         filteredRows.find((row) => row.getValue(column.id) === value)?.original
//           .sex ?? ""
//       );
//     }
//   }

//   return (
//     <Select name="status" onValueChange={handleValueChange} value={value}>
//       <SelectTrigger id={`all-${column.id}`} aria-label="Select status">
//         <SelectValue />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="all">
//           Toutes les {title.toLowerCase() + "s " + selectedSex}
//         </SelectItem>
//         {sortedUniqueValues.map((value) => (
//           <SelectItem value={value} key={value}>
//             {value}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// }

// export default DataTableSelectFilter;
