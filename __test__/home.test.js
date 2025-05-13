import "@testing-library/jest-dom";
import { within, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Product from "@/app/_models/product";
import {
  addToCart,
  getCartQuantity,
  products,
  removeAllFromCart,
  removeOneFromCart,
  getProductQuantity,
  addOneToCart,
} from "@/app/_test/test-utils";

jest.mock("@/app/_lib/database");
jest.mock("@/app/_models/product");

beforeAll(async () => {
  Product.find.mockResolvedValue(products);
  const { default: AsyncProductList } = await import(
    "@/app/_components/product-list/product-list"
  );
  const SyncProductList = await AsyncProductList();

  jest.doMock("@/app/_components/product-list/product-list", () => ({
    __esModule: true,
    default: () => {
      return SyncProductList;
    },
  }));

  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterAll(() => {
  // Clean up the mock afterwards
  jest.resetModules();
});

describe("Home", () => {
  it("shows empty cart on load", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    const quantity = getCartQuantity();
    //Assert
    expect(quantity).toBe(0);
  });

  it("shows 1 product in the cart when the user adds a product to the empty cart", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    const quantity = getCartQuantity();
    //Assert
    expect(quantity).toBe(1);
  });

  it("shows the total price of the order for 1 product in the cart properly", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    const total = screen.getByLabelText("Order Total");
    //Assert
    expect(total).toHaveTextContent(`$${products[0].price}`);
  });

  it("shows 2 product in the cart when the user adds another one", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addToCart(products[1].name);
    const quantity = getCartQuantity();
    //Assert
    expect(quantity).toBe(2);
  });

  it("shows the total price of the order for 2 products in the cart properly", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addToCart(products[1].name);
    const total = screen.getByLabelText("Order Total");
    //Assert
    expect(total).toHaveTextContent(
      `$${products[0].price + products[1].price}`
    );
  });

  it("shows empty cart after removing the only product in the cart", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await removeAllFromCart(products[0].name);
    const quantity = getCartQuantity();
    //Assert
    expect(quantity).toBe(0);
  });

  it("shows the only proper item after removing 1 of the 2 products in the cart", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addToCart(products[1].name);
    await removeAllFromCart(products[0].name);
    const quantity = getCartQuantity();
    const cart = screen.getByTestId("product-cart");
    const item = within(cart).getByText(products[1].name);
    //Assert
    expect(quantity).toBe(1);
    expect(item).toBeInTheDocument();
  });
});

describe("Home, multiple product instance", () => {
  it("shows the same amount of products when the user adds another instance from one of them", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addOneToCart(products[0].name);
    const quantity = getCartQuantity();
    //Assert
    expect(quantity).toBe(1);
  });

  it("shows the proper amount of instances when the user adds multiple from the same product", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addOneToCart(products[0].name);
    const quantity = getProductQuantity(products[0].name);
    //Assert
    expect(quantity).toBe(2);
  });

  it("shows the proper amount of instance when the user removes one", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addOneToCart(products[0].name);
    await removeOneFromCart(products[0].name);
    const quantity = getProductQuantity(products[0].name);
    //Assert
    expect(quantity).toBe(1);
  });

  it("shows the empty cart when the user removes the products one-by-one", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addOneToCart(products[0].name);
    await removeOneFromCart(products[0].name);
    await removeOneFromCart(products[0].name);
    //Act
    const quantity = getCartQuantity();
    //Assert
    expect(quantity).toBe(0);
  });

  it("shows the proper total price of the order for multiple from the same product", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    await addOneToCart(products[0].name);
    const total = screen.getByLabelText("Order Total");
    //Assert
    expect(total).toHaveTextContent(`$${products[0].price * 2}`);
  });
});

describe("Home - confirm order", () => {
  it("opens the confirm modal", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    const confirmOrderButton = screen.getByText(/confirm order/i);
    await userEvent.click(confirmOrderButton);
    const confirmOrderModal = screen.getByTestId("confirm-order-modal");
    //Assert
    expect(confirmOrderModal).toBeInTheDocument();
  });

  it("shows the proper list of products in the confirm modal", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    const items = [
      { quantity: 2, product: products[0].name },
      { quantity: 1, product: products[1].name },
    ];
    for (const item of items) {
      await addToCart(item.product);
      for (let i = 1; i < item.quantity; i++) {
        await addOneToCart(item.product);
      }
    }
    const confirmOrderButton = screen.getByText(/confirm order/i);
    await userEvent.click(confirmOrderButton);
    //Assert
    const confirmOrderModal = screen.getByTestId("confirm-order-modal");
    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
        const itemElement = within(confirmOrderModal).getByText(item.product);
        expect(itemElement).toBeInTheDocument();
        const quantity = getProductQuantity(
          item.product,
          within(confirmOrderModal)
        );
        expect(quantity).toBe(item.quantity);
      }
    }
  });

  it("empties the cart", async () => {
    //Arrange
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    //Act
    await addToCart(products[0].name);
    const confirmOrderButton = screen.getByText(/confirm order/i);
    await userEvent.click(confirmOrderButton);
    const confirmOrderModal = screen.getByTestId("confirm-order-modal");
    const startNewOrder =
      within(confirmOrderModal).getByText(/start new order/i);
    await userEvent.click(startNewOrder);
    //Assert
    const confirmOrderModalClosed = screen.queryByTestId("confirm-order-modal");
    expect(confirmOrderModalClosed).not.toBeInTheDocument();
    const quantity = getCartQuantity();
    expect(quantity).toBe(0);
  });
});
