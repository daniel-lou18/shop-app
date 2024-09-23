"use client";

import Wrapper from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import { ProductVariant } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ProductImages({
  availableSizes,
}: {
  availableSizes: ProductVariant[];
}) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const thumbnailContainer = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const activeThumbnail =
      thumbnailContainer.current?.querySelector<HTMLDivElement>(".active");
    if (activeThumbnail && thumbnailContainer.current) {
      const offset = 100;
      const containerTop = thumbnailContainer.current.scrollTop;
      const elementTop = activeThumbnail.offsetTop;
      const offsetTop = elementTop - containerTop - offset;
      thumbnailContainer.current.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, [selectedImage]);

  return (
    <>
      <div
        className="col-span-1 md:sticky md:top-[104px] md:h-[600px] md:max-h-screen overflow-hidden"
        ref={thumbnailContainer}
      >
        {availableSizes.at(0)?.images.map((image, idx) => (
          <Wrapper className="p-1" key={idx}>
            <Button
              variant="default"
              onClick={() => setSelectedImage(idx)}
              asChild
              className={`p-0 ${
                idx === selectedImage
                  ? "active outline-none ring-2 ring-ring ring-offset-2"
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
          </Wrapper>
        ))}
      </div>
      <Wrapper className="col-span-4 md:sticky md:top-[104px] md:h-[600px] md:max-h-screen overflow-hidden rounded-sm">
        <Image
          alt="Product image"
          className="h-auto w-full object-cover object-top"
          height="800"
          src={
            availableSizes.at(0)?.images.at(selectedImage) || "/placeholder.svg"
          }
          width="600"
        />
      </Wrapper>
    </>
  );
}

export default ProductImages;
