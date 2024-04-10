import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import Image from "next/image";

function ProductImages({ imagePath }: { imagePath: string | undefined }) {
  const images = imagePath?.split(" ");

  return (
    <Card className="overflow-hidden border-none shadow-none">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductImages;
