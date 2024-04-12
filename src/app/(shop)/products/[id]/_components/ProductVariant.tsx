import { db } from "@/db";
import { ProductVariant as ProductVariantModel } from "@prisma/client";
import ProductVariantForm from "./ProductVariantForm";

async function ProductVariant({ id }: { id: string }) {
  const result = await db.product.findFirst({
    where: { id },
    include: { brand: true, variants: true },
  });

  const variantsByColor = result?.variants.reduce((acc, variant) => {
    const { color, imagePath } = variant;
    const idx = acc.findIndex((item) => item.color === color);
    if (idx > -1) {
      acc.at(idx)?.variants.push(variant);
    } else {
      acc.push({ color, imagePath, variants: [{ ...variant }] });
    }
    return acc;
  }, [] as { color: string; imagePath: string | null; variants: ProductVariantModel[] }[]);

  const brandName = result?.brand.name.toUpperCase() || null;
  const productName = result?.name || null;
  const productDescription = result?.description || null;

  return (
    <ProductVariantForm
      variantsByColor={variantsByColor}
      brandName={brandName}
      productName={productName}
      productDescription={productDescription}
    />
  );
}

export default ProductVariant;
