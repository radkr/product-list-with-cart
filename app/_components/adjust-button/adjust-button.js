import Image from "next/image";

import styles from "./adjust-button.module.css";

export default function AdjustButton({ icon, filledIcon, ...props }) {
  return (
    <button className={styles.changeQuantity} {...props}>
      <Image src={icon} className={styles.icon} alt="" aria-hidden />
      <Image
        src={filledIcon}
        className={styles.filledIcon}
        alt=""
        aria-hidden
      />
    </button>
  );
}
