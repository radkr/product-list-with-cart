import styles from "./product-cart-item.module.css";

export default function ProductCartItem({ item, last }) {
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
      </div>
      {!last ? <hr className={styles.rule} /> : null}
    </>
  );
}
