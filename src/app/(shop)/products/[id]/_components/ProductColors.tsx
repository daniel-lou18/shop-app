import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ShopifyVariants } from "@/types";
import Image from "next/image";

type ProductColorsProps = {
  value: string;
  onValueChange: (value: string) => void;
  uniqueColors: string[];
  variants: ShopifyVariants["edges"];
};

function findImageUrl(variants: ShopifyVariants["edges"], color: string) {
  if (!color) return "";
  return variants.find((item) => item.node.selectedOptions[1]?.value === color)
    ?.node.image.url;
}

function ProductColors({
  value,
  onValueChange,
  uniqueColors,
  variants,
}: ProductColorsProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <p>{`${uniqueColors?.length} Couleurs disponibles`}</p>
      <ToggleGroup
        type="single"
        variant="default"
        className="gap-4 justify-start"
        value={value}
        onValueChange={onValueChange}
      >
        {uniqueColors?.map((color) => (
          <ToggleGroupItem
            value={color}
            key={color}
            className={`p-0 overflow-hidden w-20 h-20 hover:outline hover:outline-2 hover:outline-primary-dark ${
              color === value
                ? "outline-none ring-2 ring-ring ring-offset-2"
                : ""
            }`}
          >
            <Image
              alt="Product image"
              className="aspect-square w-full object-cover"
              height="150"
              src={findImageUrl(variants, color) || "/placeholder.svg"}
              width="150"
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default ProductColors;
