import { Sex } from "@prisma/client";

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
