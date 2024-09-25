import { testVariantsWithProductMenFlattened } from "@/lib/testData";
import { IProductRepository } from "../interface";
import { ProductService } from "../ProductService";

const mockProductRepository: IProductRepository = {
  findMany: jest.fn(
    () => new Promise((resolve) => resolve(testVariantsWithProductMenFlattened))
  ),
};

describe("ProductService class", () => {
  test("initializes correctly", () => {
    const productService = new ProductService(mockProductRepository);

    expect(productService).toBeInstanceOf(ProductService);
    expect(productService.getMany).toBeDefined();
  });
});
