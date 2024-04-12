"use client";

import Image from "next/image";

function ProductImage({ image }: { image: string | null }) {
  return (
    <div className="grid gap-2">
      <Image
        alt="Product image"
        className="aspect-square w-full rounded-md object-cover"
        height="300"
        src={image || "/placeholder.svg"}
        width="300"
      />
    </div>
  );
}

export default ProductImage;
