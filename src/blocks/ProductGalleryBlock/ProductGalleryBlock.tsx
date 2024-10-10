import React from "react";
import { useEffect, useState } from "react";
import Stripe from "stripe";

import ProductCard from "@/src/components/ProductCard";
import styles from "./component.module.css";
import ContentContainer from "@/src/components/common/ContentContainer";
import { Product } from "@/src/shared/types";

const ProductGalleryBlock = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const res = await fetch("/api/products", { method: "GET" });
    const jsonRes = await res.json();
    setProducts(jsonRes.products);
    console.log(jsonRes.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <ContentContainer>
        <h2>Our Collection</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products &&
            products.map((product: Product) => (
              <ProductCard
                key={product.name + Math.round(Math.random() * 100)}
                {...product}
              />
            ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default ProductGalleryBlock;
