import { ProductsWithVariants } from "@/db/queries/products";

export function dtosToProducts(dtos: ProductsWithVariants) {
  return dtos.map((dto) => ({
    id: dto.id,
    price: dto.price,
    image: dto.imagePath,
    name: dto.name,
    brandName: dto.brand.name,
    categoryName: dto.category.name,
    sex: dto.sex,
  }));
}
