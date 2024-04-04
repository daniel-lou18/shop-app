"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
};

function ProductCard({ id, name, description, imagePath }: ProductCardProps) {
  return (
    <article className="cols-1">
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardContent>
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="200"
              src={imagePath}
              width="300"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/admin/products/${id}`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </article>
  );
}

export default ProductCard;
