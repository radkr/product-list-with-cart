"use client";

import Image from "next/image";
import { use } from "react";

import styles from "./add-to-cart.module.css";
import carIcon from "@/public/images/icon-add-to-cart.svg";
import incIcon from "@/public/images/carbon--add-alt.svg";
import incFilledIcon from "@/public/images/carbon--add-filled.svg";
import decIcon from "@/public/images/carbon--subtract-alt.svg";
import decFilledIcon from "@/public/images/carbon--subtract-filled.svg";
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
        <Image src={decIcon} className={styles.icon} alt="" aria-hidden />
        <Image
          src={decFilledIcon}
          className={styles.filledIcon}
          alt=""
          aria-hidden
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
        <Image src={incIcon} className={styles.icon} alt="" aria-hidden />
        <Image
          src={incFilledIcon}
          className={styles.filledIcon}
          alt=""
          aria-hidden
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
