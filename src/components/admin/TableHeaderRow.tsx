import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        {tableHeaderItems.map((item, idx) => {
          if (idx >= tableHeaderItems.length - 2) {
            return (
              <TableHead className="hidden xl:table-cell" key={item}>
                {item}
              </TableHead>
            );
          }
          return <TableHead key={item}>{item}</TableHead>;
        })}
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default TableHeaderRow;
