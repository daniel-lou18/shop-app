import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ProductColors from "../ProductColors";
import "@testing-library/jest-dom/extend-expect";

test("it calls onValueChange when a color is selected", async () => {
  const mockFn = jest.fn();
  render(
    <ProductColors
      onValueChange={mockFn}
      value={""}
      variants={[
        { color: "red", images: [] },
        { color: "blue", images: [] },
      ]}
    />
  );
  const buttons = screen.getAllByRole("radio");
  await user.click(buttons[1]);
  expect(mockFn).toHaveBeenCalledWith("blue");
});
ProductColors.test;
