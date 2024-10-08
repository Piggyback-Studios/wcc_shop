import React from "react";
import { useEffect, useState } from "react";
import Stripe from "stripe";

import ProductCard from "@/src/components/ProductCard";
import styles from "./component.module.css";
import ContentContainer from "@/src/components/common/ContentContainer";

const ProductGalleryBlock = () => {
  const [products, setProducts] = useState<Stripe.Product[]>([]);
  const fetchProducts = async () => {
    const res = await fetch("/api/products", { method: "GET" });
    const jsonRes = await res.json();
    setProducts(jsonRes.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <ContentContainer>
        <div className={styles.product_gallery}>
          {products &&
            products.map((product: Stripe.Product) => (
              <ProductCard
                product={product}
                key={product.name + Math.round(Math.random() * 100)}
              />
            ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default ProductGalleryBlock;
