import { notFound } from "next/navigation";
import { fetchBrands } from "@/db/queries/brands";
import { fetchCategories } from "@/db/queries/categories";
import ProductVariants from "../[id]/_components/ProductVariants";
import ProductForm from "../[id]/_components/ProductForm";

async function NewProduct() {
  const [brandsResult, categoriesResult] = await Promise.all([
    fetchBrands(),
    fetchCategories(),
  ]);
  if (!brandsResult.success) throw new Error(brandsResult.error);
  if (!categoriesResult.success) throw new Error(categoriesResult.error);

  if (brandsResult.data.length === 0 || categoriesResult.data.length === 0)
    return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductForm
        type="add"
        brands={brandsResult.data}
        categories={categoriesResult.data}
      />
      <ProductVariants type="add" />
    </main>
  );
}

export default NewProduct;
