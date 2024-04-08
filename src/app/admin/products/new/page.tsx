import ProductForm from "@/components/admin-product/ProductForm";
import { db } from "@/db";
import { Brand, Category } from "@prisma/client";
import { notFound } from "next/navigation";

async function NewProduct() {
  const brands: Brand[] = await db.brand.findMany();
  const categories: Category[] = await db.category.findMany();
  if (brands.length === 0 || categories.length === 0) return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm type="add" brands={brands} categories={categories} />
    </main>
  );
}

export default NewProduct;
