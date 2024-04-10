import { ProductWithBrandCategory } from "../../../../admin/products/[id]/_components/ProductDetails";
import ProductCard from "./ProductCard";
import ProductImages from "./ProductImages";

function ProductDetailsCustomer({
  product,
}: {
  product: ProductWithBrandCategory;
}) {
  return (
    <main>
      <div className="flex gap-12">
        <ProductImages imagePath={product.imagePath} />
        <ProductCard product={product} />
      </div>
    </main>
  );
}

export default ProductDetailsCustomer;
