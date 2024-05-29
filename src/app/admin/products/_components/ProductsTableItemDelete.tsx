"use client";

import * as actions from "@/actions";
import { DropdownMenuItem } from "../../../../components/ui/dropdown-menu";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { useEffect } from "react";

function ProductsTableItemDelete({ id }: { id: string }) {
  const [formState, action] = useFormState(
    actions.deleteProduct.bind(null, id),
    {}
  );

  useEffect(() => {
    if (formState.errors?._form) {
      toast.error(formState.errors?._form.join(", "));
    }
  }, [formState]);

  return (
    <form action={action}>
      <DropdownMenuItem asChild>
        <button type="submit" className="w-full">
          Delete
        </button>
      </DropdownMenuItem>
    </form>
  );
}

export default ProductsTableItemDelete;
