"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import ContentContainer from "@/src/components/common/ContentContainer";
import { Product } from "@/src/shared/types";

const ProductListBlock = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
        <h2>Current Products</h2>
        {!products && <p>No products created yet...</p>}
        {products && (
          <table className="table-auto text-left">
            <thead>
              <tr>
                <th>Name</th>
                <th>Active</th>
                <th>Price</th>
                <th>Desc</th>
              </tr>
            </thead>
            {products.map((product: Product) => (
              <tr>
                <Link href={`/admin/products/edit/${product.id}`}>
                  <td>{product.name}</td>
                  <td>{product.active}</td>
                  <td>{product.price}</td>
                  <td>
                    {product.description
                      ? product.description.substring(0, 50) + "..."
                      : ""}
                  </td>
                </Link>
              </tr>
            ))}
          </table>
        )}
      </ContentContainer>
    </section>
  );
};

export default ProductListBlock;
