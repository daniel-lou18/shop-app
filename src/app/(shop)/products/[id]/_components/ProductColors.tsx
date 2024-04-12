import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";

function ProductColors({
  value,
  onValueChange,
  variantsByColor,
}: {
  value: string;
  onValueChange: (value: string) => void;
  variantsByColor: { color: string; imagePath: string | null }[] | undefined;
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <p>{`${variantsByColor?.length} Couleurs disponibles`}</p>
      <ToggleGroup
        type="single"
        variant="default"
        className="gap-4 justify-start"
        value={value}
        onValueChange={onValueChange}
      >
        {variantsByColor?.map((variant) => (
          <ToggleGroupItem
            value={variant.color}
            key={variant.color}
            className={`p-0 overflow-hidden w-20 h-20 hover:outline hover:outline-2 hover:outline-primary-dark ${
              variant.color === value
                ? "outline-none ring-2 ring-ring ring-offset-2"
                : ""
            }`}
          >
            <Image
              alt="Product image"
              className="aspect-square w-full object-cover"
              height="150"
              src={variant.imagePath || "/placeholder.svg"}
              width="150"
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default ProductColors;
