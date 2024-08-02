import { IProductRepository } from "./interface";

export class ProductService {
  constructor(private repo: IProductRepository) {}

  async getMany(query: string) {
    const data = await this.repo.findMany();

    const filteredData = data
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

    return filteredData;
  }
}
