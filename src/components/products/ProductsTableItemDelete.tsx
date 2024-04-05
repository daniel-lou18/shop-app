"use client";

import * as actions from "@/actions";
import { DropdownMenuItem } from "../ui/dropdown-menu";

function ProductsTableItemDelete({ id }: { id: string }) {
  async function deleteProductAction(formData: FormData) {
    await actions.deleteProduct(id);
    console.log("ok!");
  }

  return (
    <form action={deleteProductAction}>
      <DropdownMenuItem asChild>
        <button type="submit" className="w-full">
          Delete
        </button>
      </DropdownMenuItem>
    </form>
  );
}

export default ProductsTableItemDelete;
