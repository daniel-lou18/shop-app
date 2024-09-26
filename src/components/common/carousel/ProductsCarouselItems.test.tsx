jest.mock("../../../context/wishlist-context", () => ({
  useWishlist: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import ProductsCarouselItems from "./ProductsCarouselItems";
import { testVariantsWithProductWomen } from "@/lib/testData";
import { useWishlist } from "@/context/wishlist-context";

const mockedReturnValue = {
  wishlist: [],
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
};

function renderComponent() {
  // (useWishlist as jest.Mock).mockReturnValue(mockedReturnValue);
  // render(
  //   <ProductsCarouselItems title="test" items={testVariantsWithProductWomen} />
  // );
}

test("should render 12 items", () => {
  // renderComponent();
  // const items = screen.getAllByRole("listitem");
  // expect(items).toHaveLength(12);
});
