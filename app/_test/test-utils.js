import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const products = [
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

export const items = [
  { quantity: 1, product: products[0] },
  { quantity: 2, product: products[1] },
];

export async function addToCart(productName) {
  const addToCart = screen.getByLabelText(
    new RegExp(`Add ${productName}`, "i"),
    {
      selector: "button",
    }
  );
  await userEvent.click(addToCart);
}

export async function addOneToCart(productName) {
  const addToCart = screen.getByLabelText(
    new RegExp(`Add one ${productName}`, "i"),
    {
      selector: "button",
    }
  );
  await userEvent.click(addToCart);
}

export async function removeAllFromCart(productName) {
  const removeFromCart = screen.getByLabelText(
    new RegExp(`Remove all ${productName}`, "i"),
    {
      selector: "button",
    }
  );
  await userEvent.click(removeFromCart);
}

export async function removeOneFromCart(productName) {
  const removeFromCart = screen.getByLabelText(
    new RegExp(`Remove one ${productName}`, "i"),
    {
      selector: "button",
    }
  );
  await userEvent.click(removeFromCart);
}

export function getCartQuantity() {
  const heading = screen.getByText(/\((\d+)\)/);
  const match = heading.textContent.match(/\((\d+)\)/);

  const number = match ? parseInt(match[1], 10) : null;
  return number;
}

export function getProductQuantity(productName, element = screen) {
  const quantityText = element.getByLabelText(
    new RegExp(`quantity of ${productName}`, "i")
  );
  const match = quantityText.textContent.match(/(\d+)/);

  const number = match ? parseInt(match[1], 10) : null;
  return number;
}
