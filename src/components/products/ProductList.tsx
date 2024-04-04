import ProductCard from "@/components/products/ProductCard";
import { db } from "@/db";

async function getProducts() {
  await new Promise((res) => setTimeout(res, 1500));
  return await db.product.findMany();
}

async function ProductList() {
  const products = await getProducts();

  return (
    <ul className="grid grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
