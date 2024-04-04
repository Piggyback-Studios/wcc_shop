import React, { useEffect } from "react";
import Stripe from "stripe";
// import Image from "next/image";

import { useCartContext } from "@/app/context/Cart";
import { CartItem } from "@/app/types/cart.types";
import styles from "./component.module.css";
import Link from "next/link";

const CartDisplayItem = (props: CartItem) => {
  const { name, price, quantity } = props;
  const [cart] = useCartContext();

  const editProductInCart = (product: Stripe.Product) => {
    console.log("hello!");
  };

  const removeProductFromCart = (product: Stripe.Product) => {
    console.log("hello!");
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className={styles.card}>
      {/* {product.images[0] && (
        <Image
          src={product.images[0]}
          width={500}
          height={500}
          alt={`picture of ${product.name}`}
          layout="responsive"
        />
      )} */}
      <div className={styles.info}>
        <div className={styles.top_row}>
          {name && <h3 className={styles.title}>{name}</h3>}
          {price && <span className={styles.price}>${price}</span>}
        </div>
        {quantity && <p className={styles.quantity}>Qty: {quantity}</p>}

        {/* <button
          className={styles.add_to_cart_button}
          onClick={() => addProductToCart()}
        >
          Add to Cart
        </button> */}

        <button
          className={styles.edit_cart_display_item_button}
          onClick={() => editProductInCart()}
        >
          edit
        </button>

        <button
          className={styles.add_to_cart_button}
          onClick={() => removeProductFromCart()}
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
    <>
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
    </>
  );
};

export default CartSummary;
