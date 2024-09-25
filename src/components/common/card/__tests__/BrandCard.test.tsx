import { render, screen } from "@testing-library/react";
import BrandCard from "../BrandCard";
import { testVariantsWithProductMenFlattened } from "@/lib/testData";
import { brandsMen } from "@/lib/constants";

jest.mock("../../../../context/wishlist-context", () => ({
  useWishlist: jest.fn().mockReturnValue({
    wishlist: [],
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
  }),
}));

beforeEach(() => jest.clearAllMocks());

test("it should display a card of type 'variant' with the correct content", () => {
  const item = brandsMen[0];
  render(<BrandCard item={item} />);

  const title = screen.getByRole("heading");
  const description = screen.getAllByRole("paragraph")[0];

  expect(title).toHaveTextContent(item.name);
  expect(description).toHaveTextContent(item.description);
});
