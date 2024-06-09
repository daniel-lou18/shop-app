import { Column } from "@tanstack/react-table";

function DataTableSelectFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();

  return (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default DataTableSelectFilter;
