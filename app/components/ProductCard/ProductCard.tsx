import React from "react";
import Stripe from "stripe";

import styles from "./component.module.css";

interface ProductCard {
  product: Stripe.Product;
}

const ProductCard = (props: ProductCard) => {
  const { product } = props;
  console.log(product);
  return (
    <div className={styles.card}>
      <p>{product.name}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductCard;
