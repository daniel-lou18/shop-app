import { notFound } from "next/navigation";
import ProductVariant from "./_components/ProductVariant";

type ProductDetailsCustomerPageProps = {
  params: {
    id: string;
  };
};
function ProductDetailsCustomerPage({
  params,
}: ProductDetailsCustomerPageProps) {
  if (!params.id) notFound();
  return (
    <main>
      <ProductVariant id={params.id} />
    </main>
  );
}

export default ProductDetailsCustomerPage;
