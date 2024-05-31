import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

type TableHeaderProps = {
  tableHeaderItems: string[];
};
function TableHeaderRow({ tableHeaderItems }: TableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="hidden w-[100px] sm:table-cell">
          <span className="sr-only">Image</span>
        </TableHead>
        <TableHead>Nom</TableHead>
        {tableHeaderItems.map((item) => (
          <TableHead className="hidden md:table-cell" key={item}>
            {item}
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
