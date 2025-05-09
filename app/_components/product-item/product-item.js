import Image from "next/image";

import styles from "./product-item.module.css";

export default function ProductItem({ product }) {
  const imageSrc = `/images/${product.image.mobile}`;
  const imageAlt = `Photo about ${product.name}`;
  const imageWidth = 654;
  const imageHeight = 424;

  return (
    <li className={styles.card}>
      <picture>
        <source
          media="(max-width: 529px)"
          srcSet={`${process.env.VERCEL_BLOB_URI}/images/${product.image.mobile}`}
        />
        <source
          media="(max-width: 877px)"
          srcSet={`${process.env.VERCEL_BLOB_URI}/images/${product.image.tablet}`}
        />
        <source
          media="(min-width: 878px)"
          srcSet={`${process.env.VERCEL_BLOB_URI}/images/${product.image.desktop}`}
        />
        <img
          src={`${process.env.VERCEL_BLOB_URI}/images/${product.image.desktop}`}
          alt={`Photo about ${product.name}`}
          className={styles.photo}
        />
      </picture>
      <h2 className={styles.category}>{product.category}</h2>
      <p className={styles.name}>{product.name}</p>
      <p className={styles.price}>{`$${product.price}`}</p>
    </li>
  );
}
