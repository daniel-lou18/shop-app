import ProductDetailsCustomer from "./_components/ProductDetailsCustomer";
import { notFound } from "next/navigation";

type ProductDetailsCustomerPageProps = {
  params: {
    id: string;
  };
};
async function ProductDetailsCustomerPage({
  params,
}: ProductDetailsCustomerPageProps) {
  if (!params.id) notFound();
  return <ProductDetailsCustomer id={params.id} />;
}

export default ProductDetailsCustomerPage;
