import { screen, render, Variant } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { testVariantsWithProductMenFlattened } from "@/lib/testData";
import ProductsList from "../ProductsList";

jest.mock("../ProductFilters", () => () => "Mocked ProductFilters");
jest.mock("../../../../../../context/wishlist-context", () => ({
  useWishlist: jest.fn().mockReturnValue({
    wishlist: [],
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
  }),
}));

const readOnlyURLSearchParams = {
  getAll: () => ({}),
  get: (key: string) => undefined,
  entries: () => [],
  keys: () => [],
  values: () => [],
  has: (key: string) => false,
};

test("should render 3 product cards", () => {
  render(
    <ProductsList
      data={testVariantsWithProductMenFlattened}
      isLoading={false}
    />
  );
  const images = screen.getAllByRole("img");
  const productNames = screen.getAllByText("Pull en cotton bio");
  expect(images).toHaveLength(3);
  expect(productNames.length).toBeGreaterThan(0);
});