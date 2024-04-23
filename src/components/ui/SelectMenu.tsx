import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectMenuProps = {
  fieldName: string;
  menuName: string;
  currentValue: string;
  values: string[];
};

async function SelectMenu({
  fieldName,
  menuName,
  currentValue,
  values,
}: SelectMenuProps) {
  return (
    <>
      <Label htmlFor={menuName}>{menuName}</Label>
      <Select name={fieldName} defaultValue={currentValue}>
        <SelectTrigger className="w-[180px]" id={menuName}>
          <SelectValue placeholder={currentValue || "Sélectionnez"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((value) => (
              <SelectItem value={value} key={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectMenu;
