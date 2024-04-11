import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import Image from "next/image";

async function ProductImages({ id }: { id: string }) {
  const result = await db.product.findFirst({
    where: { id },
    select: { imagePath: true },
  });
  const images = result?.imagePath?.split(" ");

  return (
    <Card className="overflow-hidden border-none shadow-none flex-1">
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={
              images && images.length > 0
                ? images?.at(0) || ""
                : "/placeholder.svg"
            }
            width="300"
          />
          {/* <div className="grid grid-cols-3 gap-2">
            {images &&
              images.length > 1 &&
              images.map((imageUrl, idx) => (
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
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductImages;
