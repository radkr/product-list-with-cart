"use client";

import Image from "next/image";
import { use } from "react";

import styles from "./product-cart-item.module.css";
import removeIcon from "@/public/images/icon-remove-item.svg";
import { CartContext } from "@/app/_utils/cart-provider";

export default function ProductCartItem({ item, last }) {
  const cart = use(CartContext);

  return (
    <>
      <div className={styles.item}>
        <div className={styles.details}>
          <p className="text-preset-4-bold text-rose-900">
            {item.product.name}
          </p>
          <div className={`${styles.pricing} text-preset-4-bold text-red`}>
            <p
              className={styles.quantity}
              aria-label={`The quantity of ${item.product.name} in the cart`}
            >{`${item.quantity}x`}</p>
            <p
              className="text-preset-4 text-rose-500"
              aria-label={`The unit price of ${item.product.name}`}
            >{`@ $${item.product.price}`}</p>
            <p
              className="text-preset-4-bold text-rose-500"
              aria-label={`The total price of ${item.product.name}s`}
            >{`$${item.quantity * item.product.price}`}</p>
          </div>
        </div>
        <button
          className={styles.remove}
          aria-label={`Remove ${item.product.name} from the cart`}
          onClick={() => {
            cart.remove(item.product);
          }}
        >
          <Image src={removeIcon} alt="" aria-hidden />
        </button>
      </div>
      {!last ? <hr className={styles.rule} /> : null}
    </>
  );
}
