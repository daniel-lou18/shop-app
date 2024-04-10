import ProductDetailsCustomer from "./_components/ProductDetailsCustomer";
import { db } from "@/db";
import { notFound } from "next/navigation";

type ProductDetailsCustomerPageProps = {
  params: {
    id: string;
  };
};
async function ProductDetailsCustomerPage({
  params,
}: ProductDetailsCustomerPageProps) {
  const product = await db.product.findFirst({
    where: { id: params.id },
    include: { brand: true, category: true },
  });

  if (!product) notFound();
  return <ProductDetailsCustomer product={product} />;
}

export default ProductDetailsCustomerPage;
