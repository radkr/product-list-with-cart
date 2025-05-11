"use client";

import { createContext, useState } from "react";

export const CartContext = createContext({
  products: [],
  total: 0,
  isInCart: () => {},
  add: () => {},
});

export default function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const total = products.reduce((previousValue, item) => {
    return previousValue + item.quantity * item.product.price;
  }, 0);

  function isInCart(product) {
    return !!products.find((item) => {
      return item.product.id == product.id;
    });
  }

  function add(product) {
    setProducts((previous) => {
      let isInCart = false;
      const current = previous.map((item) => {
        if (item.product.id == product.id) {
          isInCart = true;
          return { ...item, quantity: item.quantity++ };
        } else {
          return { ...item };
        }
      });
      if (!isInCart) {
        current.push({ quantity: 1, product: product });
      }
      return current;
    });
  }

  const cartValue = {
    products: products,
    total: total,
    isInCart: isInCart,
    add: add,
  };

  return <CartContext value={cartValue}>{children}</CartContext>;
}
