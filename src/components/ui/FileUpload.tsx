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
import { ReactNode, useState } from "react";
import { ProductVariant } from "@prisma/client";
import { useToast } from "./use-toast";
import Image from "next/image";

export type FileUploadProps = {
  variants: ProductVariant[] | false;
};

function FileUpload({ variants }: FileUploadProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ids = variants && variants.map((variant) => variant.id);
  const { toast } = useToast();
  async function handleUpload(formData: FormData) {
    try {
      if (!ids || !variants) {
        setIsOpen(false);
        throw new Error("Id(s) manquant(s)");
      }
      const result = await actions.uploadImage(
        ids,
        variants.at(0)?.productId,
        formData
      );
      if (result?.errors) throw new Error(result.errors._form.join(", "));
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
        <Image
          src={
            variants && variants.length > 0 && variants.at(0)?.imagePath
              ? variants.at(0).imagePath
              : "/placeholder.svg"
          }
          alt=""
          width={80}
          height={80}
          onClick={() => setIsOpen(true)}
          className="rounded-md object-cover hover:cursor-pointer"
        />
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
    </Dialog>
  );
}

export default FileUpload;
