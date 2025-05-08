import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductItem from "./product-item";

const product = {
  image: {
    thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
    mobile: "./assets/images/image-waffle-mobile.jpg",
    tablet: "./assets/images/image-waffle-tablet.jpg",
    desktop: "./assets/images/image-waffle-desktop.jpg",
  },
  name: "Waffle with Berries",
  category: "Waffle",
  price: 6.5,
};

describe(ProductItem, () => {
  it("should render the product picture", () => {
    render(<ProductItem product={product} />);
    const photo = screen.getByAltText(`Photo about ${product.name}`);
    expect(photo).toBeInTheDocument();
  });

  it("should render the product category", () => {
    render(<ProductItem product={product} />);
    const category = screen.getByText(product.category);
    expect(category).toBeInTheDocument();
  });

  it("should render the product name", () => {
    render(<ProductItem product={product} />);
    const name = screen.getByText(product.name);
    expect(name).toBeInTheDocument();
  });

  it("should render the product price", () => {
    render(<ProductItem product={product} />);
    const price = screen.getByText(`$${product.price}`);
    expect(price).toBeInTheDocument();
  });
});
