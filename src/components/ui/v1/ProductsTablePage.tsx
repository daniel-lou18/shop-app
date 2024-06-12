"use client";

import TableContainer from "@/components/admin/TableContainer";
import ProductsTableContent from "./ProductsTableContent";
import { AllProductsWithStock } from "@/db/queries/products";
import Loader from "@/components/ui/Loader";
import {
  tableHeaderItemsProducts,
  tabsTriggersProducts,
} from "@/helpers/constants";
import { useSort } from "@/hooks/useSort";

function filterProducts(products: AllProductsWithStock, value: string) {
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

function ProductsTablePage({ data }: { data: AllProductsWithStock }) {
  const { isLoading, error, orderedData, handleSort } =
    useSort<AllProductsWithStock>(data, `/api/products`);

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      {isLoading && <Loader style="fullscreen" />}
      <TableContainer<AllProductsWithStock>
        title="Produits"
        subtitle="Gérer les produits, leurs variantes et les stocks"
        tableHeaderItems={tableHeaderItemsProducts}
        data={orderedData}
        tabsTriggers={tabsTriggersProducts}
        filterFunction={filterProducts}
        handleSort={handleSort}
      >
        <ProductsTableContent data={orderedData as AllProductsWithStock} />
      </TableContainer>
    </div>
  );
}

export default ProductsTablePage;
