import { fetchAllProductsWithTotalStock } from "@/db/queries/products";
import ProductsTablePage from "./_components/ProductsTablePage";

export default async function ProductsTable() {
  const result = await fetchAllProductsWithTotalStock();
  if (!result.success) throw new Error(result.error);
  return <ProductsTablePage data={result.data} />;
}
