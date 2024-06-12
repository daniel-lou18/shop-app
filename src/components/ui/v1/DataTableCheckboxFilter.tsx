// import { Column, Row, RowData, Table } from "@tanstack/react-table";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { ProductsTableData } from "@/app/admin/products/columns";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { FilterState } from "@/app/admin/products/data-table";

// type DataTableCheckboxFilterProps<TData> = {
//   table: Table<TData>;
//   column: Column<TData, unknown>;
//   title: string;
//   selectedSex: string;
//   setSelectedSex: Dispatch<SetStateAction<string>>;
//   setGlobalFilter: Dispatch<SetStateAction<FilterState>>;
// };

// function DataTableCheckboxFilter<TData extends ProductsTableData>({
//   table,
//   column,
//   title,
//   selectedSex,
//   setSelectedSex,
//   setGlobalFilter,
// }: DataTableCheckboxFilterProps<TData>) {
//   const [selectedValues, setSelectedValues] = useState<string[]>([]);
//   const preFilteredRows = table.getPreFilteredRowModel().rows;

//   useEffect(() => {
//     setGlobalFilter((prevState) => [...prevState, ...selectedValues]);
//   }, [selectedValues, setGlobalFilter]);

//   useEffect(() => {
//     setSelectedValues([]);
//   }, [selectedSex, setSelectedValues]);

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

//   function handleCheckedChange(value: string) {
//     setSelectedValues((prevState) => {
//       const updatedValues = selectedValues.includes(value)
//         ? prevState.filter((prev) => value !== prev)
//         : [...prevState, value];
//       setGlobalFilter((prevState) =>
//         title === "Marque"
//           ? { ...prevState, brandValues: updatedValues }
//           : { ...prevState, categoryValues: updatedValues }
//       );
//       return updatedValues;
//     });
//   }

//   useEffect(() => {
//     if (selectedSex === "all") {
//       setSelectedValues([]);
//     } else {
//       setSelectedValues((prevValue) => {
//         if (sortedUniqueValues.find((value) => value === prevValue))
//           return prevValue;
//         else return [];
//       });
//     }
//   }, [selectedSex, sortedUniqueValues]);

//   function handleValueChange(value: string) {
//     setSelectedValues(value);
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
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">{title}</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Faites votre sélection</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {sortedUniqueValues.map((value) => (
//           <DropdownMenuCheckboxItem
//             key={value}
//             checked={selectedValues.includes(value)}
//             onCheckedChange={() => handleCheckedChange(value)}
//           >
//             {value}
//           </DropdownMenuCheckboxItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default DataTableCheckboxFilter;
