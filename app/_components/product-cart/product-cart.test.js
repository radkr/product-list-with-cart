import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import ProductCart from "./product-cart";
import { CartContext } from "@/app/_utils/cart-provider";
import { getCartQuantity, items } from "@/app/_test/test-utils";

jest.mock("@/app/_models/product");

const emptyCartValue = {
  products: [],
  total: 0,
};

const filledCartValue = {
  products: items,
  total: 23.45,
};

function renderWithContext(child, value) {
  render(
    <CartContext value={value}>
      <div id="modal-root" />
      <ProductCart />
    </CartContext>
  );
}

beforeAll(async () => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

describe(ProductCart, () => {
  it("renders the product quantity in the empty cart as 0", () => {
    renderWithContext(<ProductCart />, emptyCartValue);
    const quantity = getCartQuantity();
    expect(quantity).toBe(0);
  });

  it("renders the empty cart picture", () => {
    renderWithContext(<ProductCart />, emptyCartValue);
    const empytCart = screen.getByAltText("Empty cart");
    expect(empytCart).toBeInTheDocument();
  });

  it("renders info text", () => {
    renderWithContext(<ProductCart />, emptyCartValue);
    const info = screen.getByText("Your added items will appear here");
    expect(info).toBeInTheDocument();
  });

  it("renders the product quantity in the cart properly", () => {
    renderWithContext(<ProductCart />, filledCartValue);
    const quantity = getCartQuantity();
    expect(quantity).toBe(2);
  });

  it("do not renders the empty cart picture when the cart is not empty", () => {
    renderWithContext(<ProductCart />, filledCartValue);
    const empytCart = screen.queryByAltText("Empty cart");
    expect(empytCart).not.toBeInTheDocument();
  });

  it("do not renders info text when the cart is not empty", () => {
    renderWithContext(<ProductCart />, filledCartValue);
    const info = screen.queryByText("Your added items will appear here");
    expect(info).not.toBeInTheDocument();
  });

  it("renders names of the products in the cart", () => {
    renderWithContext(<ProductCart />, filledCartValue);
    for (const item of filledCartValue.products) {
      const name = screen.getByText(item.product.name);
      expect(name).toBeInTheDocument();
    }
  });

  it("renders the total price of the order in the cart", () => {
    renderWithContext(<ProductCart />, filledCartValue);
    const total = screen.getByLabelText("Order Total");
    expect(total).toHaveTextContent("$23.45");
  });
});
