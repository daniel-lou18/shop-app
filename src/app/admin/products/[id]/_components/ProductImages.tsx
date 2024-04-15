import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import FileUpload from "../../../../../components/ui/FileUpload";
import { useState } from "react";

type ProductImagesProps = {
  type: "edit" | "add";
  imagePaths: (string | null)[] | null;
};

function ProductImages({ type, imagePaths }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    imagePaths?.at(0)
  );

  function handleClick(imageUrl: string | null) {
    setSelectedImage(imageUrl);
  }

  return (
    <div className={`${type === "edit" ? "" : "opacity-30"}`}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Images du produit</CardTitle>
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
              src={selectedImage ? selectedImage : "/placeholder.svg"}
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
    </div>
  );
}

export default ProductImages;
