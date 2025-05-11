"use client";

import Image from "next/image";
import { use } from "react";

import styles from "./product-cart.module.css";
import emptyCartImage from "@/public/images/illustration-empty-cart.svg";
import neutralImage from "@/public/images/icon-carbon-neutral.svg";
import { CartContext } from "@/app/_utils/cart-provider";
import ProductCartItem from "@/app/_components/product-cart-item/product-cart-item";

export default function ProductCart() {
  const cart = use(CartContext);
  const isEmpty = cart.products.length == 0;

  const emptyCart = isEmpty && (
    <>
      <Image
        src={emptyCartImage}
        alt="Empty cart"
        className={styles.emptyCart}
      />
      <p className={`${styles.info} text-preset-4-bold text-rose-500`}>
        Your added items will appear here
      </p>
    </>
  );

  const productList = isEmpty || (
    <>
      <ul className={styles.items}>
        {cart.products.map((item, index, items) => {
          return (
            <li key={item.product.id}>
              <ProductCartItem item={item} last={index == items.length - 1} />
            </li>
          );
        })}
      </ul>
      <hr className={styles.rule} />
      <div className={styles.total}>
        <p className="text-preset-4 text-rose-900" id="order-total">
          Order Total
        </p>
        <p
          className="text-preset-2 text-rose-900"
          aria-labelledby="order-total"
        >{`$${cart.total}`}</p>
      </div>
      <div className={styles.deliveryInfo}>
        <Image src={neutralImage} alt="" aria-hidden />
        <p className="text-preset-4 text-rose-900">
          This is a{" "}
          <strong className="text-preset-4-bold text-rose-900">
            carbon-neutral
          </strong>{" "}
          delivery.
        </p>
      </div>
    </>
  );

  return (
    <div className={styles.cart} data-testid="product-cart">
      <h2 className={`${styles.quantity} text-preset-2 text-red`}>
        {`Your Cart (${cart.products.length})`}
      </h2>
      {isEmpty ? emptyCart : productList}
    </div>
  );
}
