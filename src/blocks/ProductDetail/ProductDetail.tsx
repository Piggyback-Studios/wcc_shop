"use client";

import { useEffect, useState } from "react";

import ContentContainer from "@/src/components/common/ContentContainer";
import ProductDetailDisplay from "@/src/components/ProductDetailDisplay";
import { Product, ProductDetailBlockProps } from "@/src/shared/types";

const ProductDetail = ({ id }: ProductDetailBlockProps) => {
  const [product, setProduct] = useState<Product>();
  const loadProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    const resJson = await res.json();
    setProduct(resJson.product);
  };
  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <section>
      <ContentContainer>
        {product && <ProductDetailDisplay {...product} />}
      </ContentContainer>
    </section>
  );
};

export default ProductDetail;
