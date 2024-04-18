import { notFound } from "next/navigation";
import { fetchAllBrands } from "@/db/queries/brands";
import { fetchAllCategories } from "@/db/queries/categories";
import { fetchProductWithVariants } from "@/db/queries/product";
import ProductHeader from "./_components/ProductHeader";
import ProductDetails from "./_components/ProductDetails";
import ProductImages from "./_components/ProductImages";
import ProductVariants from "./_components/ProductVariants";
import { fetchProductVariantsByColor } from "@/db/queries/variants";

type ProductDetailsProps = {
  params: {
    id: string;
  };
};

async function ProductDetailsAdmin({ params }: ProductDetailsProps) {
  const product = await fetchProductWithVariants(params.id);
  const brands = await fetchAllBrands();
  const categories = await fetchAllCategories();
  const variantsByColor = await fetchProductVariantsByColor(params.id);

  if (!product || brands.length === 0 || categories.length === 0)
    return notFound();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <ProductHeader type="edit" />
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <ProductDetails
            type="edit"
            product={product}
            brands={brands}
            categories={categories}
            id={params.id}
          />
          <ProductImages
            type="edit"
            imagePaths={variantsByColor.map((variant) => variant.imagePath)}
          />
          <ProductVariants product={product} />
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsAdmin;
