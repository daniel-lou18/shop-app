import {
  SearchParams,
  fetchProductsWithSearchParams,
} from "@/db/queries/products";
import ProductCard from "./ProductCard";

async function ProductList({ searchParams }: { searchParams: SearchParams }) {
  const products = await fetchProductsWithSearchParams(searchParams);
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
