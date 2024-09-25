import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { shortenText } from "@/lib/helpers";

jest.mock("../../../../context/wishlist-context", () => ({
  useWishlist: jest.fn().mockReturnValue({
    wishlist: [],
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
  }),
}));

beforeEach(() => jest.clearAllMocks());

const mockProductVariant = {
  id: "clxoyr1e30177cxpla1y91263",
  href: "products/clxoylypw001acxpl1a5ad68t",
  image: "/sweat_blanc_1.jpg",
  title: "Maje",
  description: "Pantalon en cuir",
  price: 438100,
};

const mockProductBrand = {
  id: "clxoyr1e30177cxpla1y91263",
  href: "products/clxoylypw001acxpl1a5ad68t",
  image: "/sweat_blanc_1.jpg",
  title: "Maje",
  description: "Marque française emblématique",
};

type MockProduct = {
  id: string;
  href: string;
  image: string;
  title: string;
  description: string;
};

const numberRegExp = new RegExp(/\d{1,3}(\s|\u202f)?\d{1,3},\d{2} €/);

export function checkBaseContent(
  mockProduct: MockProduct,
  type: "variant" | "square" = "variant"
) {
  render(<ProductCard type={type} item={mockProduct} />);
  const title = screen.getByRole("heading");
  const description = screen.getAllByRole("paragraph")[0];
  const image = screen.getByRole("img");

  expect(title.children[0]).toHaveTextContent(mockProduct.title);
  expect(description).toHaveTextContent(mockProduct.description);
  expect(image).toHaveAttribute("alt", "Product image");
}

describe("ProductCard component when type is 'variant'", () => {
  test("it should render the card content correctly", () => {
    checkBaseContent(mockProductVariant);

    const price = screen.getByText(numberRegExp);

    expect(price).toBeInTheDocument();
  });

  test("it should shorten the title and description correctly", () => {
    render(
      <ProductCard
        type="variant"
        item={{
          ...mockProductVariant,
          title: "Polo Ralph Lauren",
          description: "Pantalon extra baggy en lin mélangé",
        }}
      />
    );

    const title = screen.getByRole("heading");
    const description = screen.getAllByRole("paragraph")[0];

    expect(title).toHaveTextContent(shortenText("Polo Ralph Lauren"));
    expect(description).toHaveTextContent(
      shortenText("Pantalon extra baggy en lin mélangé", 21)
    );
  });
});

describe("ProductCard component when type is 'square'", () => {
  test("it should render the card content correctly", () => {
    checkBaseContent(mockProductBrand, "square");

    const price = screen.queryByText(numberRegExp);

    expect(price).toBeNull();
  });
});
