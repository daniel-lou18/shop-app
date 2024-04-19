import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
function ProductsTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="hidden w-[100px] sm:table-cell">
          <span className="sr-only">Image</span>
        </TableHead>
        <TableHead>Nom</TableHead>
        <TableHead className="hidden md:table-cell">Marque</TableHead>
        <TableHead className="hidden md:table-cell">Catégorie</TableHead>
        <TableHead>Statut</TableHead>
        <TableHead className="hidden md:table-cell">Prix</TableHead>
        <TableHead className="hidden md:table-cell">Stock</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default ProductsTableHeader;
