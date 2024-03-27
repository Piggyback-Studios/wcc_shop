import React, { useEffect } from "react";
import Stripe from "stripe";
import Image from "next/image";

import styles from "./component.module.css";
import { useCartContext } from "@/app/context/Cart";

interface ProductCard {
  product: Stripe.Product;
}

const ProductCard = (props: ProductCard) => {
  const { product } = props;
  const [cart, setCart] = useCartContext();

  const addProductToCart = (product: Stripe.Product) => {
    console.log("add product to cart context here");
    const itemInCart = cart.filter(
      (cartProduct) => cartProduct.productId === product.id
    );
    const otherItemsInCart = cart.filter(
      (cartProduct) => cartProduct.productId !== product.id
    );

    setCart([
      ...otherItemsInCart,
      {
        productId: product.id,
        quantity: itemInCart.length ? itemInCart[0].quantity + 1 : 1,
        price: product.metadata.plainTextPrice,
      },
    ]);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

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
        {product.name && <h3>{product.name}</h3>}
        {product.description && <p>{product.description}</p>}
        {product.metadata.plainTextPrice && (
          <p>${product.metadata.plainTextPrice}</p>
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
