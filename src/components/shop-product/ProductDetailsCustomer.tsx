import { ProductWithBrandCategory } from "../admin-product/ProductDetails";
import ProductCard from "./ProductCard";
import ProductImages from "./ProductImages";

function ProductDetailsCustomer({
  product,
}: {
  product: ProductWithBrandCategory;
}) {
  return (
    <main>
      <div className="flex">
        <ProductImages imagePath={product.imagePath} />
        <ProductCard product={product} />
      </div>
    </main>
  );
}

export default ProductDetailsCustomer;
