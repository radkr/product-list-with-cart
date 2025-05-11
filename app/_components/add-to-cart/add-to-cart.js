"use client";

import Image from "next/image";
import { use } from "react";

import styles from "./add-to-cart.module.css";
import carIcon from "@/public/images/icon-add-to-cart.svg";
import { CartContext } from "@/app/_utils/cart-provider";

export default function AddToCart({ product, children }) {
  const cart = use(CartContext);
  const isInCart = cart.isInCart(product);

  function addToCart() {
    cart.add({ ...product });
  }

  return (
    <div className={styles.addToCart}>
      <div className={`${styles.photo} ${isInCart ? styles.photoActive : ""}`}>
        {children}
      </div>
      <button
        className={`${styles.control} ${styles.add} text-preset-4-bold text-rose-900`}
        onClick={addToCart}
        aria-label={`Add ${product.name} to the cart`}
      >
        <Image
          src={carIcon}
          alt=""
          aria-hidden
          data-testid="add-to-cart-icon"
        />
        <p>Add to Cart</p>
      </button>
    </div>
  );
}
