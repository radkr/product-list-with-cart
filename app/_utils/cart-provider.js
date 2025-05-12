"use client";

import { createContext, useState } from "react";

export const CartContext = createContext({
  products: [],
  total: 0,
  getQuantity: () => {},
  add: () => {},
  removeAll: () => {},
  remove: () => {},
});

export default function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const total = products.reduce((previousValue, item) => {
    return previousValue + item.quantity * item.product.price;
  }, 0);

  function getQuantity(product) {
    return (
      products.find((item) => {
        return item.product.id == product.id;
      })?.quantity || 0
    );
  }

  function add(product) {
    setProducts((previous) => {
      let isInCart = false;
      const current = previous.map((item) => {
        if (item.product.id == product.id) {
          isInCart = true;
          return { ...item, quantity: item.quantity + 1 };
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

  function removeAll(product) {
    setProducts((previous) => {
      const current = previous.filter((item) => {
        return !(item.product.id === product.id);
      });
      return current;
    });
  }

  function remove(product) {
    setProducts((previous) => {
      const productFound = previous.find((item) => {
        return item.product.id == product.id;
      });
      if (!productFound) {
        return previous;
      }
      if (productFound.quantity == 1) {
        return previous.filter((item) => {
          return !(item.product.id === product.id);
        });
      }
      return previous.map((item) => {
        if (item.product.id == product.id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return { ...item };
        }
      });
    });
  }

  const cartValue = {
    products: products,
    total: total,
    getQuantity: getQuantity,
    add: add,
    removeAll: removeAll,
    remove: remove,
  };

  return <CartContext value={cartValue}>{children}</CartContext>;
}
