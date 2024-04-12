import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import ProductCardForm from "./ProductCardForm";
import { ProductVariant } from "@prisma/client";

async function ProductCard({ id }: { id: string }) {
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
  }, [] as { color: string; imagePath: string | null; variants: ProductVariant[] }[]);

  return (
    <Card className="border-0 shadow-none flex-1">
      <CardHeader className="p-0">
        <CardTitle>{result?.brand.name.toUpperCase()}</CardTitle>
        <h1 className="text-2xl font-bold">{result?.name}</h1>
      </CardHeader>
      <ProductCardForm variantsByColor={variantsByColor} />
    </Card>
  );
}

export default ProductCard;
