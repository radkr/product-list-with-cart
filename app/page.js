import styles from "./page.module.css";
import ProductList from "@/app/_components/product-list/product-list";

export default function Home() {
  return (
    <main className={styles.products}>
      <ProductList />
    </main>
  );
}
