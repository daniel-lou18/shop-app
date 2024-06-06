import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableHeaderItems } from "./TableContainer";
import { useState } from "react";

type TableHeaderProps = {
  tableHeaderItems: TableHeaderItems;
  handleSort?: (searchParams: string) => void;
};
function TableHeaderRow({ tableHeaderItems, handleSort }: TableHeaderProps) {
  const [asc, setAsc] = useState<boolean>(true);

  function handleClick(e: React.MouseEvent<HTMLTableCellElement>) {
    e.preventDefault();
    handleSort &&
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
            className={
              idx >= tableHeaderItems.length - 2 ? "hidden xl:table-cell" : ""
            }
            key={item.value}
            data-value={item.value}
            onClick={handleClick}
          >
            {item.text}
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
