import { screen, render, within } from "@testing-library/react";
import ProductFilters from "../ProductFilters";
import { testFilterData } from "@/lib/testData";
import { usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation");

function renderComponent(
  pathname = "/store/homme",
  data = [],
  slug = ["homme", undefined, undefined]
) {
  const mockFn = jest.fn();
  usePathname.mockReturnValue(pathname);
  useSearchParams.mockReturnValue({
    getAll: () => ({}),
    get: (key) => undefined,
    entries: () => [],
    keys: () => [],
    values: () => [],
    has: (key) => false,
  });
  render(<ProductFilters data={data} setIsLoading={mockFn} slug={slug} />);
}

test("should render no checkboxes when filterData is empty", () => {
  renderComponent();
  const buttons = screen.queryAllByRole("button");
  expect(buttons).toHaveLength(0);
});

test("should render 4 checkboxes when url is '/store/homme'", () => {
  renderComponent(null, testFilterData);
  const buttons = screen.queryAllByRole("button");
  expect(within(buttons[0]).getByText(/couleur/i)).toBeInTheDocument();
  expect(within(buttons[1]).getByText(/taille/i)).toBeInTheDocument();
  expect(within(buttons[2]).getByText(/marque/i)).toBeInTheDocument();
  expect(within(buttons[3]).getByText(/gorie/i)).toBeInTheDocument();
});

test("should render 3 checkboxes when url is '/store/homme/doudounes'", () => {
  renderComponent("/store/homme/doudounes", testFilterData, [
    "homme",
    "doudounes",
    undefined,
  ]);
  const buttons = screen.queryAllByRole("button");
  expect(within(buttons[0]).getByText(/couleur/i)).toBeInTheDocument();
  expect(within(buttons[1]).getByText(/taille/i)).toBeInTheDocument();
  expect(within(buttons[2]).getByText(/marque/i)).toBeInTheDocument();
  expect(within(buttons[3]).queryByText(/gorie/i)).not.toBeInTheDocument();
});

test("should render 3 checkboxes when url is '/store/homme/brandstore/boss'", () => {
  renderComponent("/store/homme/brandstore/boss", testFilterData, [
    "homme",
    "brandstore",
    "boss",
  ]);
  const buttons = screen.queryAllByRole("button");
  expect(within(buttons[0]).getByText(/couleur/i)).toBeInTheDocument();
  expect(within(buttons[1]).getByText(/taille/i)).toBeInTheDocument();
  expect(within(buttons[2]).getByText(/gorie/i)).toBeInTheDocument();
  expect(within(buttons[3]).queryByText(/marque/i)).not.toBeInTheDocument();
});
