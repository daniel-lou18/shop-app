import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VariantsWithProduct } from "@/db/queries/variants";
import { ProductVariant } from "@prisma/client";

function ProductSizes({
  value,
  onValueChange,
  availableSizes,
}: {
  value: string;
  onValueChange: (value: string) => void;
  availableSizes: ProductVariant[];
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
        {availableSizes.map((item) => (
          <ToggleGroupItem
            value={item.size}
            key={item.id}
            className="w-16"
            disabled={item.stockQuantity === 0}
          >
            {item.size}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default ProductSizes;
