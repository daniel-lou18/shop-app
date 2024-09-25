import { render, screen } from "@testing-library/react";
import VariantCard from "../VariantCard";
import { testVariantsWithProductMenFlattened } from "@/lib/testData";

jest.mock("../../../../context/wishlist-context", () => ({
  useWishlist: jest.fn().mockReturnValue({
    wishlist: [],
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
  }),
}));

beforeEach(() => jest.clearAllMocks());

test("it should display a card of type 'variant' with the correct content", () => {
  const item = testVariantsWithProductMenFlattened[0];
  render(<VariantCard item={item} />);

  const title = screen.getByRole("heading");
  const description = screen.getAllByRole("paragraph")[0];

  expect(title).toHaveTextContent(item.brandName);
  expect(description).toHaveTextContent(item.productName);
});
