import ProductForm from "@/components/product/ProductForm";
import { db } from "@/db";
import { notFound } from "next/navigation";

type ProductDetailsProps = {
  params: {
    id: string;
  };
};

async function ProductDetailsAdmin({ params }: ProductDetailsProps) {
  const product = await db.product.findFirst({
    where: { id: params.id },
    include: { brand: true, category: true },
  });

  if (!product) return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm id={params.id} product={product} />
    </main>
  );
}

export default ProductDetailsAdmin;
