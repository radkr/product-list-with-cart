import "@testing-library/jest-dom";
import { within, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Product from "@/app/_models/product";
import {
  addToCart,
  getCartQuantity,
  products,
  removeAllFromCart,
  removeFromCart,
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
    await addToCart(products[0].name);
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
    await addToCart(products[0].name);
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
    await addToCart(products[0].name);
    await removeFromCart(products[0].name);
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
    await addToCart(products[0].name);
    await removeFromCart(products[0].name);
    await removeFromCart(products[0].name);
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
    await addToCart(products[0].name);
    const total = screen.getByLabelText("Order Total");
    //Assert
    expect(total).toHaveTextContent(`$${products[0].price * 2}`);
  });
});
