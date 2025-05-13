import styles from "./primary-button.module.css";

export default function PrimaryButton({ children, ...props }) {
  return (
    <button className={`${styles.primary} text-preset-3 text-white`} {...props}>
      {children}
    </button>
  );
}
