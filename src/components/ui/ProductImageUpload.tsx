"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import * as actions from "@/actions";
import ButtonSubmit from "./ButtonSubmit";
import { useState } from "react";
import { useToast } from "./use-toast";

function ProductImageUpload({
  currentImagePath,
}: {
  currentImagePath: string | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [imagePath, setImagePath] = useState<string>(currentImagePath || "");
  async function handleUpload(formData: FormData) {
    try {
      const result = await actions.uploadImage(formData);
      if (typeof result !== "string" && result.errors)
        throw new Error(result.errors._form.join(", "));
      if (typeof result === "string") setImagePath(result);
      setIsOpen(false);
    } catch (err: unknown) {
      toast({
        variant: "red",
        description:
          err instanceof Error
            ? `🚨 ${err.message}`
            : "🚨 Erreur lors de l'envoi de l'image",
      });
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="w-16">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form action={handleUpload} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Envoyer une image</DialogTitle>
            <DialogDescription>
              Choisissez une image au format jpg, jpeg, png ou webp
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" name="image" />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm">
                Annuler
              </Button>
            </DialogClose>
            <ButtonSubmit>Envoyer image</ButtonSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
      <input type="hidden" name="imagePath" value={imagePath}></input>
    </Dialog>
  );
}

export default ProductImageUpload;
