import { VariantsWithProduct, fetchVariants } from "@/db/queries/variants";
import ProductsCarouselItems from "./ProductsCarouselItems";

async function ProductsCarousel({ title }: { title: string }) {
  const resultWomen = await fetchVariants<VariantsWithProduct>({
    where: { product: { sex: "femme" } },
    take: 12,
  });
  const resultMen = await fetchVariants<VariantsWithProduct>({
    where: { product: { sex: "homme" } },
    take: 12,
  });
  const productsWomen = resultWomen.success ? resultWomen.data : [];
  const productsMen = resultMen.success ? resultMen.data : [];
  return (
    <ProductsCarouselItems
      title={title}
      items={[...productsWomen, ...productsMen]}
    />
  );
}

export default ProductsCarousel;
