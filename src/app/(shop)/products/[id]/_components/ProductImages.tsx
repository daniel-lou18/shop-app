"use client";

import { Button } from "@/components/ui/button";
import { ProductVariant } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

function ProductImages({
  availableSizes,
}: {
  availableSizes: ProductVariant[];
}) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  return (
    <div className="col-span-3 grid grid-cols-5 gap-2 md:sticky md:top-[104px] md:h-[600px] md:max-h-screen overflow-hidden">
      <div className="col-span-1 p-2">
        {availableSizes.at(0)?.images.map((image, idx) => (
          <Button
            variant="default"
            key={idx}
            onClick={() => setSelectedImage(idx)}
            asChild
            className={`p-0 ${
              idx === selectedImage
                ? "outline-none ring-2 ring-ring ring-offset-2"
                : ""
            }`}
          >
            <Image
              alt="Product thumbnail"
              className="h-auto w-full object-cover object-top mb-2 hover:cursor-pointer rounded-sm"
              height="300"
              src={image || "/placeholder.svg"}
              width="300"
            />
          </Button>
        ))}
      </div>
      <div className="p-2 col-span-4">
        <Image
          alt="Product image"
          className="h-auto w-full object-cover object-top rounded-sm"
          height="800"
          src={
            availableSizes.at(0)?.images.at(selectedImage) || "/placeholder.svg"
          }
          width="800"
        />
      </div>
    </div>
  );
}

export default ProductImages;
