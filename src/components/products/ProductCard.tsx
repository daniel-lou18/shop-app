"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type ProductCardProps = {
  title: string;
  description: string;
  images: string[];
};

function ProductCard({ title, description, images }: ProductCardProps) {
  return (
    <article className="cols-1">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardContent>
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="200"
              src={images[0]}
              width="300"
            />
          </CardContent>
        </CardHeader>
      </Card>
    </article>
  );
}

export default ProductCard;
