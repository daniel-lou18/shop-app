import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/db";
import { Brand, Category } from "@prisma/client";

type ProductDynamicSelectProps = {
  tableName: "brand" | "category";
  currentValue: string;
};

async function ProductDynamicSelect({
  tableName,
  currentValue,
}: ProductDynamicSelectProps) {
  const results: (Brand | Category)[] = await db[tableName].findMany();
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
            {results.map((result) => (
              <SelectItem value={result.id} key={result.id}>
                {result.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default ProductDynamicSelect;
