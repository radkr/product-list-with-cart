import "@testing-library/jest-dom";
import { within, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CartContext } from "@/app/_utils/cart-provider";
import AddToCart from "./add-to-cart";
import { products } from "@/app/_test/test-utils";

jest.mock("@/app/_models/product");

const emptyCartValue = {
  getQuantity: () => 0,
  add: jest.fn(),
};

describe(AddToCart, () => {
  it("renders the 'Add to Cart' button", () => {
    render(
      <CartContext value={emptyCartValue}>
        <AddToCart product={products[0]} />
      </CartContext>
    );
    const button = screen.getByLabelText(`Add ${products[0].name} to the cart`);
    const text = within(button).getByText(/add to cart/i);
    expect(text).toBeInTheDocument();
    const icon = within(button).getByTestId("add-to-cart-icon");
    expect(icon).toBeInTheDocument();
  });

  it("calls add() when the user clicks the 'Add to Cart' button", async () => {
    render(
      <CartContext value={emptyCartValue}>
        <AddToCart product={products[0]} />
      </CartContext>
    );
    const button = screen.getByLabelText(`Add ${products[0].name} to the cart`);
    await userEvent.click(button);
    expect(emptyCartValue.add).toHaveBeenCalledTimes(1);
    expect(emptyCartValue.add.mock.calls[0][0].name).toBe(products[0].name);
  });
});
