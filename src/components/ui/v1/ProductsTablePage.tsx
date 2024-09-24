"use client";

import TableContainer from "@/components/admin/TableContainer";
import ProductsTableContent from "./ProductsTableContent";
import { ProductsWithStock } from "@/db/queries/products";
import Loader from "@/components/ui/Loader";
import {
  tableHeaderItemsProducts,
  tabsTriggersProducts,
} from "@/lib/constants";
import { useSort } from "@/hooks/useSort";

function filterProducts(products: ProductsWithStock, value: string) {
  switch (value) {
    case "active":
      return products.filter((product) => product.isActive);
    case "non-active":
      return products.filter(
        (product) => !product.isActive && !product.isArchived
      );
    case "archived":
      return products.filter((product) => product.isArchived);
    default:
      return products;
  }
}

function ProductsTablePage({ data }: { data: ProductsWithStock }) {
  const { isLoading, error, orderedData, handleSort } =
    useSort<ProductsWithStock>(data, `/api/products`);

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      {isLoading && <Loader style="fullscreen" />}
      <TableContainer<ProductsWithStock>
        title="Produits"
        subtitle="Gérer les produits, leurs variantes et les stocks"
        tableHeaderItems={tableHeaderItemsProducts}
        data={orderedData}
        tabsTriggers={tabsTriggersProducts}
        filterFunction={filterProducts}
        handleSort={handleSort}
      >
        <ProductsTableContent data={orderedData as ProductsWithStock} />
      </TableContainer>
    </div>
  );
}

export default ProductsTablePage;
