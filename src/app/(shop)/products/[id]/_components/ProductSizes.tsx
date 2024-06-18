import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function ProductSizes({
  value,
  onValueChange,
  uniqueSizes,
}: {
  value: string;
  onValueChange: (value: string) => void;
  uniqueSizes: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <p>Votre taille</p>
      <ToggleGroup
        type="single"
        variant="outline"
        className="gap-4 justify-start"
        value={value}
        onValueChange={onValueChange}
      >
        {uniqueSizes.map((item) => (
          <ToggleGroupItem
            value={item}
            key={item}
            className="w-16"
            // disabled={item.stockQuantity === 0}
          >
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default ProductSizes;
