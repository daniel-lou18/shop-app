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

function FileUpload() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form action={actions.uploadImage} className="grid gap-4">
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
              <Button type="button" variant="secondary">
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
