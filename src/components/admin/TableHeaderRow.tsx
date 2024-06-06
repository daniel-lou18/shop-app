import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableHeaderItems } from "./TableContainer";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

type TableHeaderProps = {
  tableHeaderItems: TableHeaderItems;
  handleSort?: (searchParams: string) => void;
};
function TableHeaderRow({ tableHeaderItems, handleSort }: TableHeaderProps) {
  const [asc, setAsc] = useState<boolean>(true);

  function handleClick(e: React.MouseEvent<HTMLTableCellElement>) {
    e.preventDefault();
    handleSort &&
      e.currentTarget.dataset.value &&
      handleSort(e.currentTarget.dataset.value + "=" + (asc ? "desc" : "asc"));
    setAsc((value) => !value);
  }
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="hidden w-[100px] sm:table-cell">
          <span className="sr-only">Image</span>
        </TableHead>
        {tableHeaderItems.map((item, idx) => (
          <TableHead
            className={`${
              idx >= tableHeaderItems.length - 2 ? "hidden xl:table-cell" : ""
            } uppercase ${
              item.value ? "hover:cursor-pointer hover:text-primary" : ""
            }`}
            key={item.text}
            data-value={item.value}
            onClick={handleClick}
          >
            <span className="flex items-center gap-1">
              {item.text}{" "}
              {item.value && (
                <ChevronsUpDown
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5"
                />
              )}
            </span>
          </TableHead>
        ))}
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default TableHeaderRow;
