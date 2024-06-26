import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import BrandsCards from "../BrandsCards";
import "@testing-library/jest-dom/extend-expect";

test("should render the title and no cards", () => {
  render(<BrandsCards title="Title" items={[]} />);
  const title = screen.getByRole("heading");
  const paragraph = screen.getByRole("paragraph");
  const tabs = screen.getAllByRole("tab");
  const cards = screen.queryAllByRole("listitem");
  expect(cards).toHaveLength(0);
  expect(title).toHaveTextContent("Title");
  expect(paragraph).toHaveTextContent("Aucun produit à afficher");
  expect(tabs).toHaveLength(2);
});

test("tab should switch between men and women", async () => {
  render(<BrandsCards title="Title" items={[]} />);
  const tabMen = screen.getByRole("tab", { name: /homme/i });
  const tabWomen = screen.getByRole("tab", { name: /femme/i });
  await user.click(tabMen);
  expect(tabWomen).toHaveAttribute("aria-selected", "false");
  expect(tabMen).toHaveAttribute("aria-selected", "true");
});

test("should render two cards", () => {
  const items = [
    {
      id: 1,
      name: "brandName",
      sex: "femme",
      imagePath: "/image.png",
      description: "description",
    },
    {
      id: 2,
      name: "brandName",
      sex: "femme",
      imagePath: "/image.png",
      description: "description",
    },
  ];
  render(<BrandsCards title="Title" items={items} />);
  const cards = screen.getAllByRole("listitem");
  expect(cards).toHaveLength(2);
});
