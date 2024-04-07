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
  tableName: "brand" | "category";
  currentValue: string;
  values: (Brand | Category)[];
};

async function ProductDynamicSelect({
  tableName,
  currentValue,
  values,
}: ProductDynamicSelectProps) {
  return (
    <>
      <Label htmlFor={tableName}>{tableName}</Label>
      <Select name={tableName} defaultValue={currentValue}>
        <SelectTrigger className="w-[180px]" id={tableName}>
          <SelectValue
            placeholder={currentValue || `Choisissez la ${tableName}`}
          />
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
