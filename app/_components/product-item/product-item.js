import styles from "./product-item.module.css";
import AddToCart from "../add-to-cart/add-to-cart";

export default function ProductItem({ product }) {
  const productExcerpt = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: {
      thumbnail: product.image.thumbnail,
    },
  };

  return (
    <li className={styles.card}>
      <AddToCart product={productExcerpt}>
        <picture>
          <source
            media="(max-width: 529px)"
            srcSet={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_URI}/images/${product.image.mobile}`}
          />
          <source
            media="(max-width: 1252px)"
            srcSet={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_URI}/images/${product.image.tablet}`}
          />
          <source
            media="(min-width: 1253px)"
            srcSet={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_URI}/images/${product.image.desktop}`}
          />
          <img
            src={`${process.env.NEXT_PUBLIC_VERCEL_BLOB_URI}/images/${product.image.desktop}`}
            alt={`Photo about ${product.name}`}
            className={styles.photo}
          />
        </picture>
      </AddToCart>
      <h2 className="text-preset-4 text-rose-500">{product.category}</h2>
      <p className="text-preset-3 text-rose-900">{product.name}</p>
      <p className="text-preset-3 text-red">{`$${product.price}`}</p>
    </li>
  );
}
