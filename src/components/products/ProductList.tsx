import ProductCard from "@/components/products/ProductCard";
import { db } from "@/db";

async function ProductList() {
  const products = await db.product.findMany({ include: { brand: true } });

  return (
    <ul className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </ul>
  );
}

export default ProductList;
