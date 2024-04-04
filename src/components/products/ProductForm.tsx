import React from "react";
import { redirect } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { db } from "@/db";

function ProductForm() {
  async function addProduct(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const imagePath = formData.get("imagePath") as string;
    const product = await db.product.create({
      data: {
        name,
        description,
        price: Number(price),
        imagePath,
      },
    });
    console.log(product);
    redirect("/admin/products");
  }
  return (
    <form action={addProduct}>
      <div className="flex gap-4 items-center my-8">
        <Label className="w-[20%]" htmlFor="name">
          Nom
        </Label>
        <Input className="w-2/3" type="text" name="name" required id="name" />
      </div>
      <div className="flex gap-4 items-center my-8">
        <Label className="w-[20%]" htmlFor="description">
          Description
        </Label>
        <Input
          className="w-2/3"
          type="text"
          name="description"
          required
          id="description"
        />
      </div>
      <div className="flex gap-4 items-center my-8">
        <Label className="w-[20%]" htmlFor="price">
          Prix
        </Label>
        <Input
          className="w-2/3"
          type="number"
          name="price"
          required
          id="price"
        />
      </div>
      <div className="flex gap-4 items-center my-8">
        <Label className="w-[20%]" htmlFor="imagePath">
          Chemin d&apos;accès
        </Label>
        <Input
          className="w-2/3"
          type="text"
          name="imagePath"
          required
          id="imagePath"
        />
      </div>
      <div className="flex gap-4 items-center my-8">
        <Label className="w-[20%]" htmlFor="image">
          Fichier image
        </Label>
        <Input className="w-2/3" type="file" name="image" id="image" />
      </div>
      <Button type="submit">Ajouter</Button>
    </form>
  );
}

export default ProductForm;
