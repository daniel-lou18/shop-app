jest.mock("../../../../context/wishlist-context", () => ({
  useWishlist: jest.fn().mockReturnValue({
    wishlist: [],
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
  }),
}));

import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import BrandsCards from "../BrandsCards";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => jest.clearAllMocks());

test("should render the title and no cards", () => {
  render(<BrandsCards title="My Title" items={[]} />);
  const title = screen.getByText("My Title");
  const paragraph = screen.getByRole("paragraph");
  const tabs = screen.getAllByRole("tab");
  const cards = screen.queryAllByRole("listitem");
  expect(title).toBeInTheDocument();
  expect(paragraph).toHaveTextContent("Aucun produit à afficher");
  expect(tabs).toHaveLength(2);
  expect(cards).toHaveLength(0);
});

test("tab should switch between men and women", async () => {
  render(<BrandsCards title="Title" items={[]} />);
  const tabMen = screen.getByRole("tab", { name: /homme/i });
  const tabWomen = screen.getByRole("tab", { name: /femme/i });
  await user.click(tabMen);
  expect(tabWomen).toHaveAttribute("aria-selected", "false");
  expect(tabMen).toHaveAttribute("aria-selected", "true");
});

function toContainRole(container: HTMLElement, role: string, quantity = 1) {
  const elements = within(container).queryAllByRole(role);
  if (elements.length === quantity) {
    return {
      pass: true,
      message: () =>
        `Found ${quantity} elements with role ${role} as expected.`,
    };
  } else
    return {
      pass: false,
      message: () =>
        `Expected ${quantity} elements with role ${role} but received ${elements.length} instead.`,
    };
}

expect.extend({
  toContainRole,
});

function createListItems(quantity: number) {
  return Array.from({ length: quantity }, (_, idx) => ({
    id: idx + 1,
    name: `brandName-${idx}`,
    sex: "femme",
    imagePath: `/imageUrl`,
    description: `description-${idx}`,
  }));
}

test("should render information contained in the items correctly", () => {
  const items = createListItems(1);
  const item = items[0];
  render(<BrandsCards title="My title" items={items} />);
  for (let key in item) {
    if (key === "id" || key === "sex") {
      continue;
    }
    const value = item[key as keyof typeof item];
    let element;
    if (key === "imagePath") {
      element = screen.getByRole("img");
      expect(element).toHaveAttribute("alt", "Product image");
    } else {
      element = screen.getAllByText(new RegExp(value.toString()))[0];
    }
    expect(element).toBeInTheDocument();
  }
});

test("should render 2 cards", () => {
  const items = createListItems(2);
  render(<BrandsCards title="Title" items={items} />);
  const list = screen.getByRole("list");
  expect(list).toContainRole("listitem", 2);
});

test("should render 100 cards", () => {
  const items = createListItems(100);
  render(<BrandsCards title="Title" items={items} />);
  const list = screen.getByRole("list");
  expect(list).toContainRole("listitem", 100);
});
