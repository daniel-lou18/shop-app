import { VariantsWithProduct } from "@/db/queries/variants";

export function dtosToVariants(dtos: VariantsWithProduct) {
  return dtos.map((dto) => ({
    id: dto.id,
    color: dto.color,
    size: dto.size,
    price: dto.price,
    stockQuantity: dto.stockQuantity,
    images: dto.images,
    productId: dto.productId,
    productName: dto.product.name,
    brandName: dto.product.brand.name,
    categoryName: dto.product.category.name,
    sex: dto.product.sex,
  }));
}
