import { AllBrands } from "@/db/queries/brands";
import { AllCategories } from "@/db/queries/categories";
import { sizesTable } from "@/lib/constants";
import { ProductVariant, Sex } from "@prisma/client";

export type Slug = [Sex, string | undefined, string | undefined];

export type BrandSquare = {
  id: number;
  name: string;
  sex: string;
  imagePath: string;
  description: string;
};

export type MenuImages = {
  name: string;
  imageSrc: string;
  href: string;
}[];

export type NavigationSections = {
  id: string;
  name: string;
  items: AllCategories | AllBrands;
}[];

export type ProductVariantWithValidSizes = Omit<ProductVariant, "size"> & {
  size: keyof typeof sizesTable;
};
