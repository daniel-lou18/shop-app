import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BannerTop from "./BannerTop";
import { mainHero } from "@/helpers/constants";

test("should render description and image", () => {
  render(<BannerTop data={mainHero} />);
  const description = screen.getAllByRole("paragraph");
  const image = screen.getByRole("img");
  expect(description.at(-1)).toHaveTextContent(mainHero.description);

  const regex = new RegExp(mainHero.imagePath.slice(1));
  expect(image).toHaveAttribute("src", expect.stringMatching(regex));
});
