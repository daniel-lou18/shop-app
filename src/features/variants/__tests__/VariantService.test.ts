import { testVariantsWithProductMenFlattened } from "@/lib/testData";
import { IVariantRepository } from "../interface";
import { VariantService } from "../VariantService";
import { ReadonlyURLSearchParams } from "next/navigation";

const mockVariantRepository: IVariantRepository = {
  findMany: jest.fn(
    (url: string) =>
      new Promise((resolve) => resolve(testVariantsWithProductMenFlattened))
  ),
};

describe("VariantService class", () => {
  const variantService = new VariantService(mockVariantRepository);

  test("initializes correctly", () => {
    expect(variantService).toBeInstanceOf(VariantService);
    expect(variantService.getMany).toBeDefined();
  });

  test("it executes the findMany method on the repository when the getMany method is called", async () => {
    await variantService.getMany(
      "",
      new ReadonlyURLSearchParams(new URLSearchParams())
    );

    expect(mockVariantRepository.findMany).toHaveBeenCalled();
  });

  test("it executes the findMany method on the repository with the correct url string parameter", async () => {
    await variantService.getMany(
      "store/femme",
      new ReadonlyURLSearchParams(new URLSearchParams("brand=Maje"))
    );

    expect(mockVariantRepository.findMany).toHaveBeenCalledWith(
      "store/femme?brand=Maje"
    );
  });

  test("it returns the correct values", async () => {
    const result = await variantService.getMany(
      "store/femme",
      new ReadonlyURLSearchParams(new URLSearchParams("brand=Maje"))
    );

    expect(result).toEqual(testVariantsWithProductMenFlattened);
  });
});
