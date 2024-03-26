"use client";

import { useEffect, useState } from "react";
import Stripe from "stripe";

import styles from "./page.module.css";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Stripe.Product[]>([]);
  const fetchProducts = async () => {
    const res = await fetch("/api/fetch-products");
    const jsonRes = await res.json();
    setProducts(jsonRes.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => console.log(products), [products]);
  return (
    <main className={styles.main}>
      {products && (
        <div className={styles.product_carousel}>
          {products.map((product: Stripe.Product) => (
            <ProductCard product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
