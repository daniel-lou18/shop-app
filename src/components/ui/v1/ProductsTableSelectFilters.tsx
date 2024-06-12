// import DataTableSelectFilter from "@/components/ui/DataTableSelectFilter";
// import DataTableSelectFilterSex from "@/components/ui/DataTableSelectFilterSex";
// import { Column, Table } from "@tanstack/react-table";
// import { Dispatch, SetStateAction, useState } from "react";
// import { ProductsTableData } from "../columns";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import DataTableCheckboxFilter from "@/components/ui/DataTableCheckboxFilter";
// import { FilterState } from "../data-table";

// type ProductsTableSelectFiltersProps<TData extends ProductsTableData> = {
//   table: Table<TData>;
//   setGlobalFilter: Dispatch<SetStateAction<FilterState>>;
// };

// function ProductsTableSelectFilters<TData extends ProductsTableData>({
//   table,
//   setGlobalFilter,
// }: ProductsTableSelectFiltersProps<TData>) {
//   const [selectedSex, setSelectedSex] = useState<string>("all");

//   return (
//     <div className="flex gap-4 flex-1">
//       <DataTableSelectFilterSex
//         column={table.getColumn("sex") as Column<TData, unknown>}
//         title="Collection"
//         selectedSex={selectedSex}
//         setSelectedSex={setSelectedSex}
//         table={table}
//         setGlobalFilter={setGlobalFilter}
//       />
//       <div className="flex flex-2 items-center">
//         <Input
//           placeholder="Rechercher un produit"
//           value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("name")?.setFilterValue(event.target.value)
//           }
//           className="w-full"
//         />
//         <Search
//           size={20}
//           strokeWidth={1.5}
//           className="relative right-8 text-muted-foreground"
//         />
//       </div>
//       <DataTableCheckboxFilter<TData>
//         column={table.getColumn("brandName") as Column<TData, unknown>}
//         title="Marque"
//         selectedSex={selectedSex}
//         setSelectedSex={setSelectedSex}
//         table={table}
//         setGlobalFilter={setGlobalFilter}
//       />
//       <DataTableCheckboxFilter<TData>
//         column={table.getColumn("categoryName") as Column<TData, unknown>}
//         title="Catégorie"
//         selectedSex={selectedSex}
//         setSelectedSex={setSelectedSex}
//         table={table}
//         setGlobalFilter={setGlobalFilter}
//       />
//     </div>
//   );
// }

// export default ProductsTableSelectFilters;
