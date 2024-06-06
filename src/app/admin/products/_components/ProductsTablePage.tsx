"use client";

import TableContainer from "@/components/admin/TableContainer";
import ProductsTableContent from "./ProductsTableContent";
import { AllProductsWithStock } from "@/db/queries/products";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import {
  tableHeaderItemsProducts,
  tabsTriggersProducts,
} from "@/helpers/constants";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [orderedData, setOrderedData] = useState<AllProductsWithStock>(data);

  async function handleSort(searchParams: string) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`/api/products?${searchParams}`);
      const data = await res.json();
      if (!res.ok) {
        if (data.error) throw new Error(data.error);
        throw new Error(
          "Une erreur est survenue lors de la récupération des produits"
        );
      }
      setOrderedData(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Une erreur est survenue");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

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
        <ProductsTableContent data={orderedData} />
      </TableContainer>
    </div>
  );
}

export default ProductsTablePage;
