import React, { useEffect } from "react";
import Stripe from "stripe";
import Image from "next/image";

import styles from "./component.module.css";
import { useCartContext } from "@/src/context/Cart";
import { ProductCardProps, Product } from "@/src/shared/types";

const ProductCard = ({
  id,
  name,
  price,
  description,
  imageUrl,
  stripeId,
  priceId,
  stockQuantity,
  cartQuantity,
}: ProductCardProps) => {
  const [cart, setCart] = useCartContext();

  const addProductToCart = (product: Product) => {
    // i dont necessarily like this solution
    const itemInCart = cart.cartProducts.filter(
      (cartProduct) => cartProduct.id === product.id
    );
    const otherItemsInCart = cart.cartProducts.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    const totalCartProductsQuantity = cart.cartProducts.reduce(
      (runningTotal, current) => {
        return (runningTotal += current.cartQuantity);
      },
      1
    );
    setCart({
      cartProducts: [
        ...otherItemsInCart,
        {
          ...product,
          cartQuantity: itemInCart.length ? itemInCart[0].cartQuantity + 1 : 1,
        } as Product,
      ],
      totalCartProductsQuantity,
    });
  };

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

        <button
          className={styles.add_to_cart_button}
          onClick={() =>
            addProductToCart({
              id,
              name,
              price,
              description,
              imageUrl,
              stripeId,
              priceId,
              stockQuantity,
              cartQuantity,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
