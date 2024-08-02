export interface Variant {
  id: string;
  color: string;
  size: string;
  price: number;
  stockQuantity: number;
  images: string[];
  productId: string;
  productName: string;
  brandName: string;
  categoryName: string;
  sex: "homme" | "femme";
}
