export interface Product {
  id: string;
  price: number;
  image: string | null;
  name: string;
  brandName: string;
  categoryName: string;
  sex: "homme" | "femme";
}
