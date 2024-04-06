import { ReactElement, ReactNode, cloneElement } from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";

async function Product({
  children,
  id,
}: {
  children: ReactElement;
  id: string;
}) {
  const product = await db.product.findFirst({
    where: { id },
    include: { brand: true, category: true },
  });

  if (!product) return notFound();
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {cloneElement(children, { product })}
    </main>
  );
}

export default Product;
