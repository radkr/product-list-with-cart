"use client";

import Image from "next/image";
import { use } from "react";

import styles from "./add-to-cart.module.css";
import carIcon from "@/public/images/icon-add-to-cart.svg";
import incIcon from "@/public/images/icon-increment-quantity.svg";
import decIcon from "@/public/images/icon-decrement-quantity.svg";
import { CartContext } from "@/app/_utils/cart-provider";

export default function AddToCart({ product, children }) {
  const cart = use(CartContext);
  const quantity = cart.getQuantity(product);
  const isInCart = 0 < quantity;

  function addToCart() {
    cart.add({ ...product });
  }

  const addToCartButton = isInCart || (
    <button
      className={`${styles.control} ${styles.add} text-preset-4-bold text-rose-900`}
      onClick={() => {
        cart.add({ ...product });
      }}
      aria-label={`Add ${product.name} to the cart`}
    >
      <Image src={carIcon} alt="" aria-hidden data-testid="add-to-cart-icon" />
      <p>Add to Cart</p>
    </button>
  );

  const changeQuantityPanel = isInCart && (
    <div
      className={`${styles.control} ${styles.controlActive} text-preset-4-bold text-rose-900`}
    >
      <button
        className={styles.changeQuantity}
        aria-label={`Remove ${product.name} from the cart`}
        onClick={() => {
          cart.remove({ ...product });
        }}
      >
        <Image
          src={decIcon}
          alt=""
          aria-hidden
          data-testid="decrement-quantity-icon"
        />
      </button>
      <p>{quantity}</p>
      <button
        className={styles.changeQuantity}
        aria-label={`Add ${product.name} to the cart`}
        onClick={() => {
          cart.add({ ...product });
        }}
      >
        <Image
          src={incIcon}
          alt=""
          aria-hidden
          data-testid="increment-quantity-icon"
        />
      </button>
    </div>
  );

  return (
    <div className={styles.addToCart}>
      <div className={`${styles.photo} ${isInCart ? styles.photoActive : ""}`}>
        {children}
      </div>
      {isInCart ? changeQuantityPanel : addToCartButton}
    </div>
  );
}
