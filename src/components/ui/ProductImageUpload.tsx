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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ProductImageUpload() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  async function handleUpload(formData: FormData) {
    try {
      const result = await actions.uploadImage(formData);
      if (!result) throw new Error("Erreur lors de la création de l'image");
      if (typeof result !== "string" && result?.errors?._form)
        throw new Error(result.errors._form.join(", "));
      if (typeof result === "string") {
        setImagePath(result);
        router.push(`${pathname}?imagePath=${result}`);
      }
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
        <Button
          type="button"
          variant="outline"
          className="aspect-square w-1/4 h-auto"
        >
          <Upload className="text-muted-foreground" />
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
