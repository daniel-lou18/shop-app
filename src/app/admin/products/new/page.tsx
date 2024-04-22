import { notFound } from "next/navigation";
import { fetchAllBrands } from "@/db/queries/brands";
import { fetchAllCategories } from "@/db/queries/categories";
import ProductVariants from "../[id]/_components/ProductVariants";
import ProductForm from "../[id]/_components/ProductForm";

async function NewProduct() {
  const brands = await fetchAllBrands();
  const categories = await fetchAllCategories();
  if (brands.length === 0 || categories.length === 0) return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm type="add" brands={brands} categories={categories} />
      <ProductVariants type="add" />
    </main>
  );
}

export default NewProduct;
