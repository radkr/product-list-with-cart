import styles from "./page.module.css";
import CartProvider from "@/app/_utils/cart-provider";
import ProductList from "@/app/_components/product-list/product-list";
import ProductCart from "@/app/_components/product-cart/product-cart";

export const revalidate = 60;

export default function Home() {
  return (
    <div className={styles.shop}>
      <CartProvider>
        <main className={styles.products}>
          <ProductList />
        </main>
        <aside className={styles.cart}>
          <ProductCart />
        </aside>
      </CartProvider>
    </div>
  );
}
