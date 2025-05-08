import Image from "next/image";

import styles from "./product-item.module.css";

export default function ProductItem({ product }) {
  const imageSrc = `/images/${product.image.mobile}`;
  const imageAlt = `Photo about ${product.name}`;
  const imageWidth = 654;
  const imageHeight = 424;

  return (
    <li className={styles.card}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        layout="responsive"
        className={styles.photo}
      />
      <h2 className={styles.category}>{product.category}</h2>
      <p className={styles.name}>{product.name}</p>
      <p className={styles.price}>{`$${product.price}`}</p>
    </li>
  );
}
