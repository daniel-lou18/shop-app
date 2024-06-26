import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import BrandsCards from "../BrandsCards";
import "@testing-library/jest-dom/extend-expect";

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

test("should render 2 cards", () => {
  const items = Array.from({ length: 2 }, (_, idx) => ({
    id: idx,
    name: "brandName",
    sex: "femme",
    imagePath: "/image.png",
    description: "description",
  }));
  render(<BrandsCards title="Title" items={items} />);
  const list = screen.getByRole("list");
  expect(list).toContainRole("listitem", 2);
});

test("should render 100 cards", () => {
  const items = Array.from({ length: 100 }, (_, idx) => ({
    id: idx,
    name: "brandName",
    sex: "femme",
    imagePath: "/image.png",
    description: "description",
  }));
  render(<BrandsCards title="Title" items={items} />);
  const list = screen.getByRole("list");
  expect(list).toContainRole("listitem", 100);
});
