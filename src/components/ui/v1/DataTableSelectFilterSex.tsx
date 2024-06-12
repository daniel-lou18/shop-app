// import { Column, Table } from "@tanstack/react-table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Dispatch, SetStateAction, useState } from "react";
// import { ProductsTableData } from "@/app/admin/products/columns";
// import { FilterState } from "@/app/admin/products/data-table";

// type DataTableSelectFilterProps<TData> = {
//   table: Table<TData>;
//   selectedSex: string;
//   setSelectedSex: Dispatch<SetStateAction<string>>;
//   setGlobalFilter: Dispatch<SetStateAction<FilterState>>;
//   column: Column<TData, unknown>;
//   title: string;
// };
// function DataTableSelectFilterSex<TData extends ProductsTableData>({
//   table,
//   selectedSex,
//   setSelectedSex,
//   setGlobalFilter,
//   column,
//   title,
// }: DataTableSelectFilterProps<TData>) {
//   const sortedUniqueValues = Array.from(
//     column.getFacetedUniqueValues().keys()
//   ).sort();

//   function handleValueChange(value: string) {
//     table.reset();
//     setGlobalFilter({ brandValues: [], categoryValues: [] });
//     if (value === "all") {
//       setSelectedSex("all");
//       //   column.setFilterValue("");
//     } else {
//       setSelectedSex(value);
//       column.setFilterValue(value);
//     }
//   }

//   return (
//     <Select name="status" onValueChange={handleValueChange} value={selectedSex}>
//       <SelectTrigger id={`all-${column.id}`} aria-label="Select status">
//         <SelectValue placeholder={title} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="all">Toutes les collections</SelectItem>
//         {sortedUniqueValues.map((value) => (
//           <SelectItem value={value} key={value}>
//             {value}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// }

// export default DataTableSelectFilterSex;
