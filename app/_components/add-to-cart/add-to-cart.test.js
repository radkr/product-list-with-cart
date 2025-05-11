import "@testing-library/jest-dom";
import { within, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CartContext } from "@/app/_utils/cart-provider";
import AddToCart from "./add-to-cart";
import { products } from "@/app/_test/test-utils";

jest.mock("@/app/_models/product");

describe(AddToCart, () => {
  it("renders the 'Add to Cart' button", () => {
    render(<AddToCart product={products[0]} />);
    const button = screen.getByLabelText(`Add ${products[0].name} to the cart`);
    const text = within(button).getByText(/add to cart/i);
    expect(text).toBeInTheDocument();
    const icon = within(button).getByTestId("add-to-cart-icon");
    expect(icon).toBeInTheDocument();
  });

  it("calls add() when the user clicks the 'Add to Cart' button", async () => {
    const cartValue = {
      products: [],
      total: 0,
      isInCart: () => {},
      add: jest.fn(),
    };

    render(
      <CartContext value={cartValue}>
        <AddToCart product={products[0]} />
      </CartContext>
    );
    const button = screen.getByLabelText(`Add ${products[0].name} to the cart`);
    await userEvent.click(button);
    expect(cartValue.add).toHaveBeenCalledTimes(1);
    expect(cartValue.add.mock.calls[0][0].name).toBe(products[0].name);
  });
});
