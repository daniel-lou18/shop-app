"use client";

import VariantImageUpload, {
  VariantImageUploadProps,
} from "@/components/ui/VariantImageUpload";
import { TableCell } from "@/components/ui/table";

function ProductVariantEditImage(props: VariantImageUploadProps) {
  return (
    <TableCell className="w-[80px] h-[80px]">
      <VariantImageUpload {...props} />
    </TableCell>
  );
}

export default ProductVariantEditImage;
