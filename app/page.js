import styles from "./page.module.css";
import ProductList from "@/app/_components/product-list/product-list";

export const revalidate = 60;

export default function Home() {
  return (
    <main className={styles.products}>
      <ProductList />
    </main>
  );
}
