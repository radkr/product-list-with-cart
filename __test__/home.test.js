import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Product from "@/app/_models/product";
import { addToCart, getCartQuantity, products } from "@/app/_test/test-utils";

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

  it("shows 1 product in the cart when the user adds one to the empty cart", async () => {
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
});
