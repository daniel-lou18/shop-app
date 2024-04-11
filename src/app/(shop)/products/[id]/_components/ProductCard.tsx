import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { centsToEuros } from "@/helpers/helpers";
import ButtonSubmit from "../../../../../components/ui/ButtonSubmit";
import Image from "next/image";
import { db } from "@/db";

async function ProductCard({ id }: { id: string }) {
  const result = await db.product.findFirst({
    where: { id },
    include: { brand: true, variants: true },
  });
  const images = result?.imagePath.split(" ");
  const uniqueColors = Array.from(
    new Set(result?.variants.map((variant) => variant.color))
  );
  console.log(uniqueColors);

  return (
    <Card className="border-0 shadow-none flex-1">
      <CardHeader className="p-0">
        <CardTitle>{result?.brand.name.toUpperCase()}</CardTitle>
        <h1 className="text-2xl font-bold">{result?.name}</h1>
      </CardHeader>
      <CardContent className="px-0 py-4 grid grid-cols-1 gap-4">
        <p className="text-xl text-gray-950 font-semibold">
          {result?.price && centsToEuros(result.price)}
        </p>
        <div className="grid grid-cols-1 gap-2">
          <p>{`${images?.length} Couleurs disponibles`}</p>
          <ToggleGroup
            type="single"
            defaultValue=""
            variant="default"
            className="gap-4 justify-start"
          >
            {images?.map((image) => (
              <ToggleGroupItem
                value={image}
                key={image}
                className="p-0 overflow-hidden w-20 h-20 hover:outline hover:outline-2 hover:outline-primary-dark focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Image
                  alt="Product image"
                  className="aspect-square w-full object-cover"
                  height="80"
                  src={image}
                  width="80"
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <p>Votre taille</p>
          <ToggleGroup
            type="single"
            defaultValue="s"
            variant="outline"
            className="gap-4 justify-start"
          >
            {result?.variants.map((variant) => (
              <ToggleGroupItem
                value={variant.size}
                key={variant.id}
                className="w-16"
                disabled={variant.stockQuantity === 0}
              >
                {variant.size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 px-2 text-lg">
        <ButtonSubmit size="lg" className="w-full text-lg">
          Ajouter au panier
        </ButtonSubmit>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
