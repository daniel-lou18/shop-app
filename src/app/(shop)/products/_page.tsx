import ProductList from "./_components/ProductList";
import { fetchAllProductsWithData } from "@/db/queries/products";

async function CustomerProducts() {
  const availableProducts = (await fetchAllProductsWithData()).filter(
    (product) => product.isActive
  );

  return (
    <>
      <ProductList products={availableProducts} />
    </>
  );
}

export default CustomerProducts;
