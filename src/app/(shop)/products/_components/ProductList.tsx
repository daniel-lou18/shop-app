import { AllProductsWithData } from "@/db/queries/products";
import ProductCard from "./ProductCard";

async function ProductList({ products }: { products: AllProductsWithData }) {
  if (!products || products.length === 0)
    return <p>Aucun produit à afficher</p>;

  return (
    <ul className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </ul>
  );
}

export default ProductList;
