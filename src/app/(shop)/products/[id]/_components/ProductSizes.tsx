import BaseComponent from "@/components/ui/BaseComponent";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { sizesTable } from "@/lib/constants";
import { orderSizes } from "@/lib/helpers";
import { ProductVariantWithValidSizes } from "@/types";
import { useMemo } from "react";

function ProductSizes({
  value,
  onValueChange,
  availableSizes,
}: {
  value: string;
  onValueChange: (value: string) => void;
  availableSizes: ProductVariantWithValidSizes[];
}) {
  const orderedSizes = useMemo(
    () => orderSizes(availableSizes, sizesTable),
    [availableSizes]
  );

  return (
    <BaseComponent className="grid grid-cols-1 gap-2">
      <BaseComponent tag="p">Votre taille</BaseComponent>
      <ToggleGroup
        type="single"
        variant="outline"
        className="gap-4 justify-start"
        value={value}
        onValueChange={onValueChange}
      >
        {orderedSizes.map((item) => (
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
    </BaseComponent>
  );
}

export default ProductSizes;
