import { fetchProducts } from "@/db/queries/products";
import ProductCard from "./ProductCard";
import { type StoreProps } from "../../store/[slug]/[brand]/page";

async function ProductList({ params, searchParams }: StoreProps) {
  const products = await fetchProducts(params, searchParams);

  if (!products || products.length === 0)
    return <p>Aucun produit à afficher</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard type="product" {...product} key={product.id} />
      ))}
    </ul>
  );
}

export default ProductList;
