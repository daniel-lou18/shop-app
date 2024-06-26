import { render, screen } from "@testing-library/react";
import ProductsCarouselItems from "./ProductsCarouselItems";
import { testVariantsWithProductWomen } from "@/helpers/testData";

function renderComponent() {
  render(
    <ProductsCarouselItems title="test" items={testVariantsWithProductWomen} />
  );
}

test("should render 12 items", () => {
  renderComponent();
  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(12);
});
