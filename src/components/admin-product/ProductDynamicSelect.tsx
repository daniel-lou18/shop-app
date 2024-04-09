import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brand, Category } from "@prisma/client";

type ProductDynamicSelectProps = {
  menuName: "Marque" | "Catégorie";
  currentValue: string;
  values: (Brand | Category)[];
};

async function ProductDynamicSelect({
  menuName,
  currentValue,
  values,
}: ProductDynamicSelectProps) {
  return (
    <>
      <Label htmlFor={menuName}>{menuName}</Label>
      <Select
        name={menuName === "Marque" ? "brand" : "category"}
        defaultValue={currentValue}
      >
        <SelectTrigger className="w-[180px]" id={menuName}>
          <SelectValue placeholder={currentValue || "Sélectionnez"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((value) => (
              <SelectItem value={value.id} key={value.id}>
                {value.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default ProductDynamicSelect;
