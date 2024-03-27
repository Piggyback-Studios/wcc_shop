import React from "react";
import Stripe from "stripe";
import Image from "next/image";

import styles from "./component.module.css";

interface ProductCard {
  product: Stripe.Product;
}

const ProductCard = (props: ProductCard) => {
  const { product } = props;
  console.log(product);
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        {product.images[0] && (
          <Image
            src={product.images[0]}
            width={500}
            height={500}
            alt={`picture of ${product.name}`}
          />
        )}

        <p>{product.name}</p>
        <p>{product.description}</p>
        {product.default_price && <p>{product.default_price.toString()}</p>}
        <button className={styles.add_to_cart_button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
