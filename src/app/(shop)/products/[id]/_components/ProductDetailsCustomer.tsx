import ProductVariant from "./ProductVariant";
import ProductImages from "./ProductImage";

type ProductDetailsCustomerProps = { id: string };

function ProductDetailsCustomer(props: ProductDetailsCustomerProps) {
  return (
    <div className="flex gap-12">
      <ProductVariant {...props} />
    </div>
  );
}

export default ProductDetailsCustomer;
