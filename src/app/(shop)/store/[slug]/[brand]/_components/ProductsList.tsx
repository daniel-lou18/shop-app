import { AllProductsWithVariants, fetchProducts } from "@/db/queries/products";
import ProductCard from "../../../../products/_components/ProductCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
        <Suspense
          fallback={<Skeleton className="w-full h-full" />}
          key={product.id}
        >
          <ProductCard type="product" item={product} key={product.id} />
        </Suspense>
      ))}
    </ul>
  );
}

export default ProductsList;
