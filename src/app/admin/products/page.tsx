import { fetchAllProductsWithTotalStock } from "@/db/queries/products";
import ProductsTablePage from "./_components/ProductsTablePage";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ProductsTable() {
  const result = await fetchAllProductsWithTotalStock();
  if (!result.success) throw new Error(result.error);
  // return <ProductsTablePage data={result.data} />;
  return <DataTable columns={columns} data={result.data} />;
}
