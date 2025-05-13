import styles from "./confirm-order-item.module.css";

export default function ConfirmOrderItem({ item, last }) {
  return (
    <>
      <li className={styles.item}>
        <div className={styles.product}>
          <picture>
            <img
              src={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_URI}/images/${item.product.image.thumbnail}`}
              alt={`Photo about ${item.product.name}`}
              width={48}
              height={48}
              className={styles.photo}
            />
          </picture>
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
            </div>
          </div>
        </div>
        <p
          className="text-preset-3 text-rose-900"
          aria-label={`The total price of ${item.product.name}s`}
        >{`$${item.quantity * item.product.price}`}</p>
      </li>
      {!last ? <hr className={styles.rule} /> : null}
    </>
  );
}
