import PageHeading1 from "@/components/ui/PageHeading1";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AdminProducts() {
  return (
    <div className="flex justify-between">
      <PageHeading1>Produits</PageHeading1>
      <Button asChild>
        <Link href="/admin/products/new">Ajouter produit</Link>
      </Button>
    </div>
  );
}

export default AdminProducts;
