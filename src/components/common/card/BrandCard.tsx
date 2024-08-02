import ProductCard from "./ProductCard";
import { paths } from "@/lib/paths";
import { BrandSquare } from "@/types";

function mapData(item: BrandSquare) {
  return {
    id: item.id.toString(),
    href: paths.storeBrand(item.sex, item.name),
    title: item.name,
    description: item.description,
    image: item.imagePath,
  };
}

type BrandCardProps = {
  item: BrandSquare;
  className?: string;
};

function BrandCard({ item, className }: BrandCardProps) {
  return (
    <ProductCard type="square" item={mapData(item)} className={className} />
  );
}

export default BrandCard;
