"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import { deleteProduct } from "@/actions/delete-product";

function ProductsTableItemDelete({ id }: { id: string }) {
  const { toast } = useToast();

  async function handleDelete(id: string) {
    const res = await deleteProduct(id);
    if (res?.error) toast({ description: res.error });
    else toast({ description: "Le produit a été supprimé" });
  }

  return (
    <form action={handleDelete.bind(null, id)}>
      <DropdownMenuItem asChild>
        <button type="submit" className="w-full">
          Delete
        </button>
      </DropdownMenuItem>
    </form>
  );
}

export default ProductsTableItemDelete;
