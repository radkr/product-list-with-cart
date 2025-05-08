import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductList from "./product-list";
import Product from "@/app/_models/product";

jest.mock("@/app/_lib/database");
jest.mock("@/app/_models/product");

const products = [
  {
    id: 0,
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    id: 1,
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
];

describe(ProductList, () => {
  it("should render the 'Desserts' heading", async () => {
    render(await ProductList());
    const heading = screen.getByText("Desserts");
    expect(heading).toBeInTheDocument();
  });

  it("should render no products", async () => {
    render(await ProductList());
    const listItem = screen.queryByRole("listitem");
    expect(listItem).not.toBeInTheDocument();
  });

  it("should render one product", async () => {
    Product.find.mockResolvedValue(products.slice(0, 1));
    render(await ProductList());
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();
    const text = screen.getByText("Waffle");
    expect(text).toBeInTheDocument;
  });

  it("should render two products", async () => {
    Product.find.mockResolvedValue(products);
    render(await ProductList());
    const listItem = screen.getAllByRole("listitem");
    expect(listItem.length).toBe(2);
    const text1 = screen.getByText("Waffle");
    expect(text1).toBeInTheDocument;
    const text2 = screen.getByText("Crème Brûlée");
    expect(text2).toBeInTheDocument;
  });
});
