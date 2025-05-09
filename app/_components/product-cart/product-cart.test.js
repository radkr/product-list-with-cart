import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import ProductCart from "./product-cart";

describe(ProductCart, () => {
  it("renders the product quantity in the empty cart as 0", () => {
    render(<ProductCart />);
    const quantityElement = screen.getByTestId("quantity");
    expect(quantityElement.textContent).toMatch(/(0)/);
  });

  it("renders the empty cart picture", () => {
    render(<ProductCart />);
    const empytCart = screen.getByAltText("Empty cart");
    expect(empytCart).toBeInTheDocument();
  });

  it("renders info text", () => {
    render(<ProductCart />);
    const info = screen.getByText("Your added items will appear here");
    expect(info).toBeInTheDocument();
  });
});
