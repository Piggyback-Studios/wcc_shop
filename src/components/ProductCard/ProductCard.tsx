import React, { useEffect } from "react";
import Stripe from "stripe";
import Image from "next/image";

import styles from "./component.module.css";
import { useCartContext } from "@/src/context/Cart";
import { ProductCardProps } from "@/src/shared/types";

const ProductCard = ({
  name,
  price,
  description,
  imageUrl,
}: ProductCardProps) => {
  const [cart, setCart] = useCartContext();

  // const addProductToCart = (product: Stripe.Product) => {
  //   // i dont necessarily like this solution
  //   const itemInCart = cart.cartItems.filter(
  //     (cartProduct) => cartProduct.id === product.id
  //   );
  //   const otherItemsInCart = cart.cartItems.filter(
  //     (cartProduct) => cartProduct.id !== product.id
  //   );
  //   const totalCartItemsQuantity = cart.cartItems.reduce(
  //     (runningTotal, current) => {
  //       return (runningTotal += current.quantity);
  //     },
  //     1
  //   );
  //   setCart({
  //     cartItems: [
  //       ...otherItemsInCart,
  //       {
  //         name,
  //         id,
  //         quantity: itemInCart.length ? itemInCart[0].quantity + 1 : 1,
  //         price: Number(product.metadata.plainTextPrice),
  //         image: imageUrl,
  //       },
  //     ],
  //     totalCartItemsQuantity,
  //   });
  // };

  return (
    <div className={styles.card}>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt={`picture of ${name}`}
          layout="responsive"
        />
      )}
      <div className={styles.info}>
        <div className={styles.top_row}>
          <p className={styles.name}>{name}</p>

          <span className={styles.price}>${price}</span>
        </div>
        {description && <p className={styles.description}>{description}</p>}
        {/* 
        <button
          className={styles.add_to_cart_button}
          onClick={() => addProductToCart(product)}
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
