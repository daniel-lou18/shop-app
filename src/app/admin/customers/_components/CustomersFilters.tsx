import { ProductsTableProps } from "@/app/admin/products/page";
import TableActions from "../../../../components/admin/TableActions";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

async function CustomersFilters({ searchParams }: ProductsTableProps) {
  return (
    <>
      <div className="flex gap-4 flex-1 pb-4">
        <div
          className="flex items-center relative min-w-[300px] max-w-[500px] bg-white"
          id="customers-search-container"
        ></div>
        <TableActions buttonText={`Ajouter client`} />
      </div>
    </>
  );
}

export default CustomersFilters;
