import React, { useEffect } from "react";
// import Image from "next/image";

import { useCartContext } from "@/app/context/Cart";
import { CartItem } from "@/app/types/cart.types";
import styles from "./component.module.css";
import Link from "next/link";

const CartDisplayItem = (props: CartItem) => {
  const { name, price, quantity, image } = props;
  const [cart, setCart] = useCartContext();

  const editProductInCart = (product: CartItem) => {
    console.log("hello!");
  };

  const removeProductFromCart = (product: CartItem) => {
    const otherItemsInCart = cart.cartItems.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    const totalCartItemsQuantity = otherItemsInCart.reduce(
      (runningTotal, current) => {
        return (runningTotal += current.quantity);
      },
      1
    );
    setCart({
      cartItems: [...otherItemsInCart],
      totalCartItemsQuantity,
    });
  };
  console.log(quantity);

  return (
    <div className={styles.display_item}>
      <div className={styles.top_row}>
        <div className={styles.info_section}>
          {name && <h3 className={styles.name}>{name}</h3>}
          {price && <span className={styles.price}>${price}</span>}
          {quantity && <p className={styles.quantity}>Qty: {quantity}</p>}
        </div>
        {/* {image && (
          <Image
            src={image}
            width={500}
            height={500}
            alt={`picture of ${name}`}
            className={styles.cart_display_item_image}
          />
        )} */}
      </div>

      <div className={styles.button_row}>
        <button
          className={styles.edit_cart_display_item_button}
          onClick={() => editProductInCart({ ...props })}
        >
          edit
        </button>
        <button
          className={styles.add_to_cart_button}
          onClick={() => removeProductFromCart({ ...props })}
        >
          remove
        </button>
      </div>
    </div>
  );
};

const CartSummary = () => {
  const [cart] = useCartContext();
  return (
    <div className={styles.cart_summary}>
      {cart?.cartItems.length
        ? cart?.cartItems.map((cartItem) => (
            <CartDisplayItem
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
