import React, { useEffect } from "react";
import Stripe from "stripe";
import Image from "next/image";

import styles from "./component.module.css";
import { useCartContext } from "@/src/context/Cart";
import { ProductCardProps, Product } from "@/src/shared/types";
import CustomButton from "../common/CustomButton";

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
          className="rounded-lg mb-4"
        />
      )}
      <div className={styles.info}>
        <div className="mb-2 flex justify-between">
          <h6>{name}</h6>
          <span className={styles.price}>${price}</span>
        </div>
        {description && <p className={styles.description}>{description}</p>}
        <CustomButton
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
          label="Add to Cart"
          className="absolute bottom-0 translate-y-1/2 right-2"
        />
      </div>
    </div>
  );
};

export default ProductCard;
