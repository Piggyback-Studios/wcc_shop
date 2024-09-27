import React, { useEffect } from "react";
import Stripe from "stripe";
import Image from "next/image";

import styles from "./component.module.css";
import { useCartContext } from "@/src/context/Cart";
import { CartItem } from "@/app/types/cart.types";

interface ProductCard {
  product: Stripe.Product;
}

const ProductCard = (props: ProductCard) => {
  const { product } = props;
  const [cart, setCart] = useCartContext();

  const addProductToCart = (product: Stripe.Product) => {
    // i dont necessarily like this solution
    const itemInCart = cart.cartItems.filter(
      (cartProduct) => cartProduct.id === product.id
    );
    const otherItemsInCart = cart.cartItems.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    const totalCartItemsQuantity = cart.cartItems.reduce(
      (runningTotal, current) => {
        return (runningTotal += current.quantity);
      },
      1
    );
    setCart({
      cartItems: [
        ...otherItemsInCart,
        {
          name: product.name,
          id: product.id,
          quantity: itemInCart.length ? itemInCart[0].quantity + 1 : 1,
          price: Number(product.metadata.plainTextPrice),
          image: product.images[0],
        } as CartItem,
      ],
      totalCartItemsQuantity,
    });
  };

  return (
    <div className={styles.card}>
      {product.images[0] && (
        <Image
          src={product.images[0]}
          width={500}
          height={500}
          alt={`picture of ${product.name}`}
          layout="responsive"
        />
      )}
      <div className={styles.info}>
        <div className={styles.top_row}>
          {product.name && <h3 className={styles.name}>{product.name}</h3>}
          {product.metadata.plainTextPrice && (
            <span className={styles.price}>
              ${product.metadata.plainTextPrice}
            </span>
          )}
        </div>
        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        <button
          className={styles.add_to_cart_button}
          onClick={() => addProductToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
