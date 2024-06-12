import { columns } from "@/app/admin/products/columns";
import { DataTable } from "@/app/admin/products/data-table";
import { db } from "@/db";
import { Sex } from "@prisma/client";
import ProductsSelectSex from "@/app/admin/products/_components/ProductsSelectSex";
import { handleFetchError } from "@/lib/errors";
import {
  AllProductsWithStock,
  AllProductsWithVariants,
  FetchResult,
  fetchAllProductsWithTotalStock,
} from "@/db/queries/products";
import { ProductsTableProps } from "@/app/admin/products/page";

function addTotalStockToProducts(products: AllProductsWithVariants) {
  return products.map((product) => {
    const totalStock = product.variants.reduce((acc, variant) => {
      if (!variant.stockQuantity) return acc;
      return acc + variant.stockQuantity;
    }, 0);
    return {
      ...product,
      totalStock,
    };
  });
}
async function ProductsData({ searchParams }: ProductsTableProps) {
  async function fetchAllProductsWithTotalStock(
    searchParams?: ProductsTableProps
  ): Promise<FetchResult<AllProductsWithStock>> {
    try {
      const result = await db.product.findMany({
        where: {
          sex: searchParams?.sex === "all" ? undefined : searchParams?.sex,
        },
        include: {
          brand: true,
          category: true,
          variants: true,
        },
      });

      if (!result || result.length === 0)
        throw new Error("Nous n'avons retrouvé aucun produit");
      const data = addTotalStockToProducts(result);
      return {
        success: true,
        data,
      };
    } catch (err) {
      return handleFetchError(
        err,
        "Une erreur est survenue lors de la récupération des produits"
      );
    }
  }

  const result = await fetchAllProductsWithTotalStock(searchParams);
  if (!result.success) throw new Error(result.error);
  return <DataTable columns={columns} data={result.data} />;
}

export default ProductsData;
