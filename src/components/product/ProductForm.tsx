"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProductDetails from "./ProductDetails";
import * as actions from "@/actions";
import { Brand, Category, Product } from "@prisma/client";
import ButtonSubmit from "../ui/ButtonSubmit";
import { useToast } from "../ui/use-toast";

function ProductForm({
  id,
  product,
  brands,
  categories,
}: {
  id: string;
  product: Product & { brand: Brand; category: Category };
  brands: Brand[];
  categories: Category[];
}) {
  const { toast } = useToast();
  async function editProductAction(id: string, formData: FormData) {
    const res = await actions.editProduct(id, formData);
    if (res?.error) toast({ description: res.error });
    else toast({ description: "Le produit a été modifié" });
  }

  return (
    <form action={editProductAction.bind(null, id)}>
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <Link href="/admin/products">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Retourner</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Modifier produit
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            En stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button type="button" variant="outline" size="sm">
              Annuler
            </Button>
            <ButtonSubmit>Sauvegarder</ButtonSubmit>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <ProductDetails
              product={product}
              brands={brands}
              categories={categories}
            />
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Ajouter des variants dans cette rubrique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="w-[100px]">Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-001</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-1" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-1" type="number" defaultValue="100" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-1" className="sr-only">
                          Price
                        </Label>
                        <Input
                          id="price-1"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="single"
                          defaultValue="s"
                          variant="outline"
                        >
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-002</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-2" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-2" type="number" defaultValue="143" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-2" className="sr-only">
                          Price
                        </Label>
                        <Input
                          id="price-2"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="single"
                          defaultValue="m"
                          variant="outline"
                        >
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-003</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-3" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-3" type="number" defaultValue="32" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-3" className="sr-only">
                          Stock
                        </Label>
                        <Input
                          id="price-3"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type="single"
                          defaultValue="s"
                          variant="outline"
                        >
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={product.imagePath}
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button type="button">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button type="button">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button
                      type="button"
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button type="button" size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button type="button" variant="outline" size="sm">
            Annuler
          </Button>
          <Button type="submit" size="sm">
            Sauvegarder
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
