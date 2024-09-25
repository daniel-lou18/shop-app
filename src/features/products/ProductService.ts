import { IProductRepository } from "./interface";
import { Product } from "./Product";

export class ProductService {
  constructor(private repo: IProductRepository) {}

  async getMany(
    query: string,
    filterFn?: (query: string, data: Product[]) => Product[]
  ) {
    const data = await this.repo.findMany();

    if (filterFn) {
      return filterFn(query, data);
    }

    return this.filterData(query, data);
  }

  filterData(query: string, data: Product[]) {
    return data
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          product.brandName
            .toLowerCase()
            .includes(query.trim().toLowerCase()) ||
          product.categoryName
            .toLowerCase()
            .includes(query.trim().toLowerCase())
      )
      .slice(0, 10);
  }
}
