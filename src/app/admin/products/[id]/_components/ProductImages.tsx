import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import FileUpload from "../../../../../components/ui/FileUpload";

function ProductImages({
  id,
  imagePath,
}: {
  id: string | undefined;
  imagePath: string | undefined;
}) {
  const images = imagePath?.split(" ");

  return (
    <div className={`${id ? "" : "opacity-30"}`}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Images du produit</CardTitle>
          <CardDescription>
            Ajoutez, modifiez ou supprimez des images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src={imagePath ? images?.at(0) || "" : "/placeholder.svg"}
              width="300"
            />
            <div className="grid grid-cols-3 gap-2">
              {images &&
                images.length > 1 &&
                images.slice(1).map((imageUrl, idx) => (
                  <button type="button" key={idx}>
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src={imageUrl}
                      width="84"
                    />
                  </button>
                ))}
              <FileUpload id={id} currentImagePath={imagePath} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductImages;
