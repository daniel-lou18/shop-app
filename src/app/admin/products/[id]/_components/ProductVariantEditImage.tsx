"use client";

import FileUpload, { FileUploadProps } from "@/components/ui/FileUpload";
import { TableCell } from "@/components/ui/table";

function ProductVariantEditImage(props: FileUploadProps) {
  return (
    <TableCell className="w-[80px] h-[80px]">
      <FileUpload {...props} />
    </TableCell>
  );
}

export default ProductVariantEditImage;
