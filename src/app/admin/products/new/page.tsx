import { db } from "@/db";
import { Brand, Category, Product, ProductVariant } from "@prisma/client";
import { notFound } from "next/navigation";
import * as actions from "@/actions/variant";
import { fetchAllBrands } from "@/db/queries/brands";
import { fetchAllCategories } from "@/db/queries/categories";
import { fetchProductWithVariants } from "@/db/queries/product";
import ProductHeader from "../[id]/_components/ProductHeader";
import ProductDetails from "../[id]/_components/ProductDetails";
import ProductImages from "../[id]/_components/ProductImages";
import ProductVariants from "../[id]/_components/ProductVariants";

async function NewProduct() {
  const brands = await fetchAllBrands();
  const categories = await fetchAllCategories();
  if (brands.length === 0 || categories.length === 0) return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <ProductHeader type="edit" />
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <ProductDetails type="add" brands={brands} categories={categories} />
          <ProductImages type="add" />
          <ProductVariants data={null} />
        </div>
      </div>
    </main>
  );
}

export default NewProduct;
