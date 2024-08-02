import { Variant } from "@/features/variants/Variant";
import ProductCard from "./ProductCard";
import { paths } from "@/lib/paths";

function mapData(item: Variant) {
  return {
    id: item.id,
    href: paths.customerProduct(item.productId, `color=${item.color}`),
    title: item.brandName,
    description: item.productName,
    image: item.images[0],
    price: item.price,
  };
}

type VariantCardProps = {
  item: Variant;
  className?: string;
};

function VariantCard({ item, className }: VariantCardProps) {
  return (
    <ProductCard type="variant" item={mapData(item)} className={className} />
  );
}

export default VariantCard;
