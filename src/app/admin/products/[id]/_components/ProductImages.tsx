"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductStatus from "./ProductStatus";
import ProductArchive from "./ProductArchive";

type ProductImagesProps = {
  type: "edit" | "add";
  imagePaths?: (string | null)[] | null;
};

function ProductImages({ type, imagePaths }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    imagePaths?.at(0)
  );
  const searchParams = useSearchParams();
  const imagePathParams = searchParams.get("imagePath");

  function handleClick(imageUrl: string | null) {
    setSelectedImage(imageUrl);
  }

  return (
    <div className={`${type === "edit" ? "" : "opacity-30"}`}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>
            Ajoutez, modifiez ou supprimez des images dans la rubrique
            &quot;Variantes&quot;
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src={
                type === "edit"
                  ? selectedImage
                    ? selectedImage
                    : "/placeholder.svg"
                  : imagePathParams
                  ? imagePathParams
                  : "/placeholder.svg"
              }
              width="300"
            />
            <div className="grid grid-cols-3 gap-2">
              {imagePaths &&
                imagePaths.length > 1 &&
                imagePaths.map((imageUrl, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleClick(imageUrl)}
                  >
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src={imageUrl || "/placeholder.svg"}
                      width="84"
                    />
                  </button>
                ))}
              {/* <FileUpload id={id} currentImagePath={imagePath} /> */}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <ProductArchive /> */}
    </div>
  );
}

export default ProductImages;
