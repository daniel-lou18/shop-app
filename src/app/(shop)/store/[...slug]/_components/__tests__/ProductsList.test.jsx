import { screen, render } from "@testing-library/react";
import { testVariantsWithProductMen } from "@/helpers/testData";
import { usePathname, useSearchParams } from "next/navigation";
import ProductsList from "../ProductsList";

const readOnlyURLSearchParams = {
  getAll: () => ({}),
  get: (key) => undefined,
  entries: () => [],
  keys: () => [],
  values: () => [],
  has: (key) => false,
};

jest.mock("next/navigation");
jest.mock("../../../../../../hooks/useGetProductsCustomer", () => {
  const mockFn = jest.fn();
  return {
    useGetProductsCustomer: jest.fn().mockReturnValue({
      filteredVariants: testVariantsWithProductMen,
      isLoading: false,
      setIsLoading: mockFn,
      error: "",
      params: ["homme", undefined, undefined],
    }),
  };
});
jest.mock("../ProductFilters", () => () => "Mocked ProductFilters");

function renderComponent(pathname = "/store/homme", data = []) {
  usePathname.mockReturnValue(pathname);
  useSearchParams.mockReturnValue(readOnlyURLSearchParams);
  render(<ProductsList filterData={data} count={data.length} />);
}

test("should render 12 product cards", () => {
  renderComponent("/store/homme", testVariantsWithProductMen);
  const images = screen.getAllByRole("img");
  const productNames = screen.getAllByText("Pull en cotton bio");
  expect(images).toHaveLength(12);
  expect(productNames.length).toBeGreaterThan(0);
});
