import React from "react";

import { useCartContext } from "@/app/context/Cart";
import styles from "./component.module.css";
import Link from "next/link";
import CartSummaryItem from "../CartSummaryItem";

const CartSummary = () => {
  const [cart] = useCartContext();
  return (
    <div className={styles.cart_summary}>
      {cart?.cartItems.length
        ? cart?.cartItems.map((cartItem) => (
            <CartSummaryItem
              {...cartItem}
              key={cartItem.name + Math.round(Math.random() * 100)}
            />
          ))
        : ""}
      {cart?.cartItems.length ? (
        <Link href={"/checkout"}>
          <button className={styles.add_to_cart_button}>go to checkout</button>
        </Link>
      ) : (
        ""
      )}
      {!cart?.cartItems.length && <p>No items in cart...</p>}
    </div>
  );
};

export default CartSummary;
