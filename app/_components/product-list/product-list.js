"use server";

import "server-only";

import styles from "./product-list.module.css";
import dbConnect from "@/app/_lib/database";
import Product from "@/app/_models/product";
import ProductItem from "@/app/_components/product-item/product-item";

export default async function ProductList() {
  await dbConnect();
  const products = await Product.find();
  return (
    <>
      <h1 className={`${styles.title} text-preset-1 text-rose-900`}>
        Desserts
      </h1>
      <ul className={styles.list}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
