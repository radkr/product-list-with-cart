"use client";

import Image from "next/image";
import { use, useState } from "react";

import styles from "./add-to-cart.module.css";
import carIcon from "@/public/images/icon-add-to-cart.svg";
import incIcon from "@/public/images/carbon--add-alt.svg";
import incFilledIcon from "@/public/images/carbon--add-filled.svg";
import decIcon from "@/public/images/carbon--subtract-alt.svg";
import decFilledIcon from "@/public/images/carbon--subtract-filled.svg";
import { CartContext } from "@/app/_utils/cart-provider";
import AdjustButton from "@/app/_components/adjust-button/adjust-button";

export default function AddToCart({ product, children }) {
  const [clicked, setClicked] = useState(false);
  const cart = use(CartContext);
  const quantity = cart.getQuantity(product);
  const isInCart = 0 < quantity;

  const addToCartButton = (
    <button
      className={`${styles.control} ${styles.add} ${
        clicked ? (!isInCart ? styles.show : styles.hide) : ""
      } text-preset-4-bold text-rose-900`}
      onClick={() => {
        setClicked(true);
        cart.add({ ...product });
      }}
      aria-label={`Add ${product.name} to the cart`}
    >
      <Image src={carIcon} alt="" aria-hidden data-testid="add-to-cart-icon" />
      <p>Add to Cart</p>
    </button>
  );

  const changeQuantityPanel = (
    <div
      className={`${styles.control} ${styles.addAndRemove} ${
        clicked ? (isInCart ? styles.show : styles.hide) : ""
      } text-preset-4-bold text-rose-900`}
    >
      <AdjustButton
        icon={decIcon}
        filledIcon={decFilledIcon}
        aria-label={`Remove one ${product.name} from the cart`}
        onClick={() => {
          cart.remove({ ...product });
        }}
      ></AdjustButton>
      <p>{quantity}</p>
      <AdjustButton
        icon={incIcon}
        filledIcon={incFilledIcon}
        aria-label={`Add one ${product.name} to the cart`}
        onClick={() => {
          cart.add({ ...product });
        }}
      ></AdjustButton>
    </div>
  );

  return (
    <div className={styles.addToCart}>
      <div className={`${styles.photo} ${isInCart ? styles.photoActive : ""}`}>
        {children}
      </div>
      {changeQuantityPanel}
      {addToCartButton}
    </div>
  );
}
