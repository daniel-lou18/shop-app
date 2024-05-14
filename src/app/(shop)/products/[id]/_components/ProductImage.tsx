"use client";

import Image from "next/image";

function ProductImage({ image }: { image: string | null }) {
  return (
    <div className="grid gap-2 md:sticky md:top-[104px] md:h-[600px] md:max-h-screen">
      <Image
        alt="Product image"
        className="aspect-square w-full rounded-md object-cover"
        height="600"
        src={image || "/placeholder.svg"}
        width="600"
      />
    </div>
  );
}

export default ProductImage;
