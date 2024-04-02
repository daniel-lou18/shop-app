import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function ProductForm() {
  return (
    <form>
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
        <Label className="w-[20%]" htmlFor="image">
          Fichier image
        </Label>
        <Input className="w-2/3" type="file" name="image" required id="image" />
      </div>
      <Button type="submit">Ajouter</Button>
    </form>
  );
}

export default ProductForm;
