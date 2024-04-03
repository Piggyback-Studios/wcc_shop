import React, { useEffect } from "react";
import Stripe from "stripe";
// import Image from "next/image";

import { useCartContext } from "@/app/context/Cart";
import { CartItem } from "@/app/types/cart.types";
import styles from "./component.module.css";

const CartDisplayItem = (props: CartItem) => {
  const { productName, price, quantity } = props;
  const [cart] = useCartContext();

  const addProductToCart = (product: Stripe.Product) => {
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
          {productName && <h3 className={styles.title}>{productName}</h3>}
          {price && <span className={styles.price}>${price}</span>}
        </div>
        {/* {product.description && (
          <p className={styles.description}>{product.description}</p>
        )} */}

        {/* <button
          className={styles.add_to_cart_button}
          onClick={() => addProductToCart()}
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

const CartSummary = () => {
  const [cart] = useCartContext();
  return (
    <>
      {cart?.cartItems &&
        cart?.cartItems.map((cartItem) => (
          <CartDisplayItem
            {...cartItem}
            key={cartItem.productName + Math.round(Math.random() * 100)}
          />
        ))}
      {!cart?.cartItems && <p>No items in cart...</p>}
    </>
  );
};

export default CartSummary;
