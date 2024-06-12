import { columns } from "@/app/admin/products/columns";
import { DataTable } from "@/app/admin/products/data-table";
import {
  AllProductsWithStock,
  fetchAllProductsWithData,
} from "@/db/queries/products";
import { ProductsTableProps } from "@/app/admin/products/page";

async function ProductsData({ searchParams }: ProductsTableProps) {
  const result = await fetchAllProductsWithData<AllProductsWithStock>({
    where: {
      sex: searchParams?.sex ? searchParams?.sex : "femme",
      brand: { name: { in: searchParams?.brand?.split(",") } },
      category: { name: { in: searchParams?.category?.split(",") } },
    },
    addTotalStock: true,
  });
  return (
    <DataTable columns={columns} data={result.success ? result.data : []} />
  );
}

export default ProductsData;
