import { AllProductsWithVariants } from "@/db/queries/products";
import ProductCard from "../../../../products/_components/ProductCard";

async function ProductsList({
  products,
}: {
  products: AllProductsWithVariants;
}) {
  if (!products || products.length === 0)
    return <p>Aucun produit à afficher</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard type="product" item={product} key={product.id} />
      ))}
    </ul>
  );
}

export default ProductsList;
