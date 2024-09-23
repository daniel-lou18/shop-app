import Wrapper from "@/components/layout/Wrapper";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VariantsWithProduct } from "@/db/queries/variants";
import Image from "next/image";

type ProductColorsProps = {
  value: string;
  onValueChange: (value: string) => void;
  variants: VariantsWithProduct;
};

function ProductColors({ value, onValueChange, variants }: ProductColorsProps) {
  const colors = Array.from(new Set(variants.map((variant) => variant.color)));
  return (
    <Wrapper className="grid grid-cols-1 gap-1">
      <Wrapper
        element="p"
        className="mb-1"
      >{`${colors?.length} couleurs disponibles :`}</Wrapper>
      <ToggleGroup
        type="single"
        variant="default"
        className="gap-4 justify-start"
        value={value}
        onValueChange={onValueChange}
      >
        {colors?.map((color) => (
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
              className="aspect-square w-full object-cover object-top"
              height="150"
              src={
                variants.find((variant) => variant.color === color)
                  ?.images[0] || "/placeholder.svg"
              }
              width="150"
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Wrapper element="p" className="text-sm">
        Couleur : {value.toUpperCase()}
      </Wrapper>
    </Wrapper>
  );
}

export default ProductColors;
