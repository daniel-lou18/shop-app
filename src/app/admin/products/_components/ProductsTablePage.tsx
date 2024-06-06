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
  return products.filter((product) => {
    switch (value) {
      case "active":
        return product.isActive;
      case "non-active":
        return !product.isActive && !product.isArchived;
      case "archived":
        return product.isArchived;
      default:
        return product;
    }
  });
}

function ProductsTablePage({ data }: { data: AllProductsWithStock }) {
  const { isLoading, error, orderedData, handleSort } = useSort(
    data,
    `/api/products`
  );

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      {isLoading && <Loader style="fullscreen" />}
      <TableContainer
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
