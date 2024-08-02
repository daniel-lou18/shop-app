import { ProductsWithVariants } from "@/db/queries/products";
import { nextApiClient } from "@/app/api/nextApiClient";
import { dtosToProducts } from "./transformDto";

async function findMany() {
  const data = await nextApiClient.get<ProductsWithVariants>("/products");
  return dtosToProducts(data);
}

const ProductRepository = { findMany };

export default ProductRepository;
