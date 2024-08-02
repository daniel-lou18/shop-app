import { Product } from "./Product";

export interface IProductRepository {
  findMany: () => Promise<Product[]>;
}
