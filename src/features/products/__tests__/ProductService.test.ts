import { testVariantsWithProductMenFlattened } from "@/lib/testData";
import { IProductRepository } from "../interface";
import { ProductService } from "../ProductService";

const mockProductRepository: IProductRepository = {
  findMany: jest.fn(
    () => new Promise((resolve) => resolve(testVariantsWithProductMenFlattened))
  ),
};

const mockData = [
  {
    id: "clxoylywc001bcxplmisp6e86",
    name: "Jean en cotton bio",
    size: "XS",
    color: "blanc",
    price: 332550,
    image: "/sweat_blanc_1.jpg",
    productName: "Jean en cotton bio",
    brandName: "Levi's",
    categoryName: "jeans",
    sex: "homme" as const,
  },
  {
    id: "clxoym0hh001ocxplmjoezzcd",
    name: "Pull en cotton bio",
    size: "XS",
    color: "blanc",
    price: 97950,
    image: "/sweat_blanc_1.jpg",
    productName: "Pull en cotton bio",
    brandName: "Sandro",
    categoryName: "pulls et gilets",
    sex: "homme" as const,
  },
  {
    id: "clxoym22o0021cxplvppetwou",
    name: "Veste en cotton bio",
    size: "XS",
    color: "blanc",
    price: 170800,
    image: "/sweat_blanc_1.jpg",
    productName: "Veste en cotton bio",
    brandName: "Gucci",
    categoryName: "vestes",
    sex: "homme" as const,
  },
];

const expectedFilteredResult = [
  {
    id: "clxoym0hh001ocxplmjoezzcd",
    name: "Pull en cotton bio",
    size: "XS",
    color: "blanc",
    price: 97950,
    image: "/sweat_blanc_1.jpg",
    productName: "Pull en cotton bio",
    brandName: "Sandro",
    categoryName: "pulls et gilets",
    sex: "homme" as const,
  },
];

const mockProductRepositoryFilter: IProductRepository = {
  findMany: jest.fn(() => new Promise((resolve) => resolve(mockData))),
};

describe("ProductService class", () => {
  let productService = new ProductService(mockProductRepository);

  test("initializes correctly", () => {
    expect(productService).toBeInstanceOf(ProductService);
    expect(productService.getMany).toBeDefined();
  });

  test("it executes the findMany method on the repository when the getMany method is called", async () => {
    await productService.getMany("");
    expect(mockProductRepository.findMany).toHaveBeenCalled();
  });

  test("it returns the correct value if the query is an empty string", async () => {
    const result = await productService.getMany("");
    expect(result).toEqual(testVariantsWithProductMenFlattened);
  });

  test("it returns the correct filtered values", async () => {
    productService = new ProductService(mockProductRepositoryFilter);

    const result = await productService.getMany("pull");
    expect(result).toEqual(expectedFilteredResult);
  });
});
