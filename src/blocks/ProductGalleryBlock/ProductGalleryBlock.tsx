"use client";

import React from "react";
import { useEffect } from "react";

import ProductCard from "@/src/components/ProductCard";
import ContentContainer from "@/src/components/common/ContentContainer";
import { Product } from "@/src/shared/types";
import { useProductsContext } from "@/src/context/Products";

const ProductGalleryBlock = () => {
  const [productsContext, setProducts] = useProductsContext();
  const fetchProducts = async () => {
    const res = await fetch("/api/products", { method: "GET" });
    const jsonRes = await res.json();
    setProducts({ products: jsonRes.products });
  };
  useEffect(() => {
    if (!productsContext.products.length) fetchProducts();
    else console.log("products");
  }, []);
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <h2>Our Collection</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {productsContext.products.length
            ? productsContext.products.map((product: Product) => (
                <ProductCard
                  key={product.name + Math.round(Math.random() * 100)}
                  {...product}
                />
              ))
            : null}
        </div>
      </ContentContainer>
    </section>
  );
};

export default ProductGalleryBlock;
