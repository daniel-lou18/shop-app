import { ProductWithBrandCategory } from "../../../../admin/products/[id]/_components/ProductDetails";
import ProductCard from "./ProductCard";
import ProductImages from "./ProductImages";

type ProductDetailsCustomerProps = { id: string };

function ProductDetailsCustomer(props: ProductDetailsCustomerProps) {
  return (
    <main>
      <div className="flex gap-12">
        <ProductImages {...props} />
        <ProductCard {...props} />
      </div>
    </main>
  );
}

export default ProductDetailsCustomer;
