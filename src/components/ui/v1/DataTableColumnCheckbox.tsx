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
// import { ProductsTableItemProps } from "@/app/admin/products/_components/ProductsTableItem";

// type DataTableColumnCheckboxProps<TData> = {
//   column: Column<TData, unknown>;
//   title: string;
//   selectedSex: string;
//   setSelectedSex: Dispatch<SetStateAction<string>>;
//   table: Table<ProductsTableItemProps>;
// };

// function DataTableColumnCheckbox<TData extends ProductsTableData>({
//   column,
//   title,
//   selectedSex,
//   setSelectedSex,
//   table,
// }: DataTableColumnCheckboxProps<TData>) {
//   const [selectedValues, setSelectedValues] = useState<string[]>([]);
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const facetedUniqueValues = Array.from(
//     column.getFacetedUniqueValues().keys()
//   ).sort();

//   function handleCheckedChange(value: string) {
//     setSelectedValues((prevState) => {
//       const updatedValues = selectedValues.includes(value)
//         ? prevState.filter((prev) => value !== prev)
//         : [...prevState, value];
//       column.setFilterValue(updatedValues);
//       return updatedValues;
//     });
//   }

//   return (
//     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">{title}</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Faites votre sélection</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {facetedUniqueValues.map((value) => (
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

// export default DataTableColumnCheckbox;
