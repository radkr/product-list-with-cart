import { useState, use } from "react";
import Image from "next/image";

import styles from "./confirm-order.module.css";
import { CartContext } from "@/app/_utils/cart-provider";
import PrimaryButton from "@/app/_components/primary-button/primary-button";
import Modal from "@/app/_components/modal/modal";
import confirmIcon from "@/public/images/icon-order-confirmed.svg";
import ConfirmOrderItem from "@/app/_components/confirm-order-item/confirm-order-item";

export default function ConfirmOrder() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = use(CartContext);

  return (
    <>
      <PrimaryButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Confirm Order
      </PrimaryButton>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className={styles.modal} data-testid="confirm-order-modal">
          <div>
            <Image
              src={confirmIcon}
              alt=""
              aria-hidden
              className={styles.icon}
            />
            <h2 className="text-preset-1 text-rose-900">Order Confirmed</h2>
            <p className="text-preset-4 text-rose-500">
              We hope you enjoy your food!
            </p>
          </div>
          <div className={styles.cart}>
            <ul className={styles.products}>
              {cart.products.map((item, index) => (
                <ConfirmOrderItem
                  key={item.product.id}
                  item={item}
                  last={index == cart.products.length - 1}
                ></ConfirmOrderItem>
              ))}
            </ul>
            <hr className={styles.rule} />
            <div className={styles.total}>
              <p className="text-preset-4 text-rose-900">Order Total</p>
              <p
                className="text-preset-2 text-rose-900"
                aria-labelledby="order-total"
              >{`$${cart.total.toFixed(2)}`}</p>
            </div>
          </div>
          <PrimaryButton
            onClick={() => {
              cart.reset();
              setIsOpen(false);
            }}
          >
            Start New Order
          </PrimaryButton>
        </div>
      </Modal>
    </>
  );
}
