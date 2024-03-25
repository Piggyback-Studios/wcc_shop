"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Stripe from "stripe";

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
      {products.length &&
        products.map((product: Stripe.Product) => <p>{product.name}</p>)}
    </main>
  );
}
