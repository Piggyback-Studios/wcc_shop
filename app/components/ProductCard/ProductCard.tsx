import React from "react";
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

    setCart([...cart, product]);
  };
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        {product.images[0] && (
          <Image
            src={product.images[0]}
            width={500}
            height={500}
            alt={`picture of ${product.name}`}
            layout="responsive"
          />
        )}

        {product.name && <h3>{product.name}</h3>}
        {product.description && <p>{product.description}</p>}
        {product.default_price && <p>{product.default_price.toString()}</p>}
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
