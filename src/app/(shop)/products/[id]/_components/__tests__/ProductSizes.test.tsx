import { render, screen } from "@testing-library/react";
import ProductSizes from "../ProductSizes";
import userEvent from "@testing-library/user-event";

const mockData = [
  {
    id: "clxoym3ng002ecxplqu0dpodl",
    productId: "clxoym3h5002dcxplc0emxrn7",
    size: "M" as const,
    color: "blanc",
    price: 71850,
    images: [
      "/sweat_blanc_1.jpg",
      "/sweat_blanc_2.jpg",
      "/sweat_blanc_3.jpg",
      "/sweat_blanc_4.jpg",
    ],
    sku: "blanc-XS-1718990589436",
    stockQuantity: 100,
    createdAt: new Date("2024-06-21T17:23:09.437Z"),
    updatedAt: new Date("2024-06-21T17:23:09.437Z"),
  },
  {
    id: "clxoym57d002rcxpl8hybdqho",
    productId: "clxoym3h5002dcxplc0emxrn7",
    size: "S" as const,
    color: "blanc",
    price: 71850,
    images: [
      "/sweat_blanc_1.jpg",
      "/sweat_blanc_2.jpg",
      "/sweat_blanc_3.jpg",
      "/sweat_blanc_4.jpg",
    ],
    sku: "blanc-S-1718990591448",
    stockQuantity: 100,
    createdAt: new Date("2024-06-21T17:23:11.450Z"),
    updatedAt: new Date("2024-06-21T17:23:11.450Z"),
  },
  {
    id: "clxoyqjdg0130cxplei9zu3oj",
    productId: "clxoym3h5002dcxplc0emxrn7",
    size: "XS" as const,
    color: "blanc",
    price: 71850,
    images: [
      "/sweat_blanc_1.jpg",
      "/sweat_blanc_2.jpg",
      "/sweat_blanc_3.jpg",
      "/sweat_blanc_4.jpg",
    ],
    sku: "blanc-M-1718990796435",
    stockQuantity: 100,
    createdAt: new Date("2024-06-21T17:26:36.436Z"),
    updatedAt: new Date("2024-06-21T17:26:36.436Z"),
  },
];

describe("ProductSizes component", () => {
  test("displays size tabs in the correct order", () => {
    render(
      <ProductSizes
        value=""
        onValueChange={jest.fn()}
        availableSizes={mockData}
      />
    );

    const tabs = screen.getAllByRole("radio");
    expect(tabs).toHaveLength(mockData.length);
    expect(tabs[0]).toHaveTextContent(/xs/i);
    expect(tabs[1]).toHaveTextContent(/s/i);
    expect(tabs[2]).toHaveTextContent(/m/i);
  });

  test("highlights the selected size tab", () => {
    render(
      <ProductSizes
        value="S"
        onValueChange={jest.fn()}
        availableSizes={mockData}
      />
    );

    const tabs = screen.getAllByRole("radio");

    expect(tabs[0]).toHaveAttribute("aria-checked", "false");
    expect(tabs[1]).toHaveAttribute("aria-checked", "true");
    expect(tabs[2]).toHaveAttribute("aria-checked", "false");
  });

  test("disables a size tag if the stock quantity is 0", () => {
    render(
      <ProductSizes
        value="M"
        onValueChange={jest.fn()}
        availableSizes={[
          ...mockData.slice(0, 2),
          {
            id: "clxoyqjdg0130cxplei9zu3oj",
            productId: "clxoym3h5002dcxplc0emxrn7",
            size: "XS" as const,
            color: "blanc",
            price: 71850,
            images: [
              "/sweat_blanc_1.jpg",
              "/sweat_blanc_2.jpg",
              "/sweat_blanc_3.jpg",
              "/sweat_blanc_4.jpg",
            ],
            sku: "blanc-M-1718990796435",
            stockQuantity: 0,
            createdAt: new Date("2024-06-21T17:26:36.436Z"),
            updatedAt: new Date("2024-06-21T17:26:36.436Z"),
          },
        ]}
      />
    );

    const tabs = screen.getAllByRole("radio");
    expect(tabs[0]).toHaveAttribute("disabled");
    expect(tabs[1]).not.toHaveAttribute("disabled");
    expect(tabs[2]).not.toHaveAttribute("disabled");

    expect(tabs[0]).toHaveAttribute("aria-checked", "false");
    expect(tabs[1]).toHaveAttribute("aria-checked", "false");
    expect(tabs[2]).toHaveAttribute("aria-checked", "true");
  });

  test("a click on a tab executes the function passed to the onValueChange prop and passes the size as an argument to this function", async () => {
    const mockFunction = jest.fn();

    render(
      <ProductSizes
        value=""
        availableSizes={mockData}
        onValueChange={mockFunction}
      />
    );

    const user = userEvent.setup();

    const tabs = screen.getAllByRole("radio");

    await user.click(tabs[1]);

    expect(mockFunction).toHaveBeenCalledWith("S");
  });
});
