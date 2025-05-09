import Image from "next/image";

import styles from "./product-cart.module.css";
import emptyCart from "@/public/images/illustration-empty-cart.svg";

export default function ProductCart() {
  return (
    <div className={styles.cart}>
      <h2 className={styles.quantity} data-testid="quantity">
        Your Cart (0)
      </h2>
      <Image src={emptyCart} alt="Empty cart" className={styles.emptyCart} />
      <p className={styles.info}>Your added items will appear here</p>
    </div>
  );
}
