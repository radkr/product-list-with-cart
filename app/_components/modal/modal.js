"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import style from "./modal.module.css";

export default function Modal({ open, onClose, children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dialogRef = useRef();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      const modal = dialogRef.current;

      function setIsAnimatingFalse() {
        setIsAnimating(false);
      }

      modal.addEventListener("animationcancel", setIsAnimatingFalse);
      modal.addEventListener("animationend", setIsAnimatingFalse);

      return () => {
        modal.removeEventListener("animationcancel", setIsAnimatingFalse);
        modal.removeEventListener("animationend", setIsAnimatingFalse);
      };
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const modal = dialogRef.current;

      if (open) {
        setIsAnimating(true);
        modal.showModal();
      }

      return () => {
        setIsAnimating(true);
        modal.close();
      };
    }
  }, [isMounted, open]);

  return isMounted
    ? createPortal(
        <dialog
          className={style.modal}
          ref={dialogRef}
          onClose={onClose}
          onClick={(event) => {
            event.stopPropagation();
            if (event.target == dialogRef.current) {
              onClose();
            }
          }}
        >
          {(isAnimating || open) && children}
        </dialog>,
        document.getElementById("modal-root")
      )
    : null;
}
