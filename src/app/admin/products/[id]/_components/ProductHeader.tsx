import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/ButtonSubmit";

type ProductHeaderProps = {
  type: "edit" | `add`;
  totalStock: number | undefined;
};

function ProductHeader({ type, totalStock }: ProductHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-7 w-7"
        asChild
      >
        <Link href="/admin/products">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Retourner</span>
        </Link>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        {`${type === "edit" ? "Modifier un" : "Ajouter un nouveau"} produit`}
      </h1>
      {type === "edit" && (
        <Badge variant="outline" className="ml-auto sm:ml-0">
          {`${totalStock} `} en stock
        </Badge>
      )}
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href="/admin/products">Annuler </Link>
        </Button>
        <ButtonSubmit>Sauvegarder</ButtonSubmit>
      </div>
    </div>
  );
}

export default ProductHeader;
