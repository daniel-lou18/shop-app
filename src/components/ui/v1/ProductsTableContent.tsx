import { TableBody } from "@/components/ui/table";
import ProductsTableItem from "./ProductsTableItem";
import { AllProductsWithStock } from "@/db/queries/products";

type ProductsTableContentProps = {
  data: AllProductsWithStock;
};

function ProductsTableContent({ data }: ProductsTableContentProps) {
  return (
    <TableBody>
      {data.length > 0 &&
        data.map((product) => (
          <ProductsTableItem {...product} key={product.id} />
        ))}
    </TableBody>
  );
}

export default ProductsTableContent;
