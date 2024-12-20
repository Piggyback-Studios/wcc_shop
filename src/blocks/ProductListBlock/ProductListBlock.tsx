"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import ContentContainer from "@/src/components/common/ContentContainer";
import { Product } from "@/src/shared/types";
import { useAdminProductsContext } from "@/src/context/AdminProducts";

const ProductListBlock = () => {
  const [adminProductsContext, setAdminProducts] = useAdminProductsContext();
  const fetchProducts = async () => {
    const res = await fetch("/api/products?adminList=true", { method: "GET" });
    const jsonRes = await res.json();
    setAdminProducts({ products: jsonRes.products });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="flex justify-between items-center">
          <h1>Current Products</h1>
          <Link href="/admin/products/create">
            <span>Create Product</span>
          </Link>
        </div>
        {adminProductsContext.products.length ? (
          <table className="table-auto text-left md:table-fixed border-separate border-spacing-x-2 border-spacing-y-1 md:border-spacing-x-4 border-spacing-y-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Active</th>
                <th className="hidden md:table-cell">Price</th>
                <th className="hidden md:table-cell">Desc</th>
              </tr>
            </thead>
            {adminProductsContext.products.map(
              (product: Product, idx: number) => (
                <tr key={idx}>
                  <td>
                    <Link href={`/admin/products/edit/${product.id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.active.toString()}</td>
                  <td className="hidden md:table-cell">{product.price}</td>
                  <td className="hidden md:table-cell">
                    {product.description
                      ? product.description.length > 50
                        ? product.description.substring(0, 50) + "..."
                        : product.description
                      : ""}
                  </td>
                </tr>
              )
            )}
          </table>
        ) : (
          <p>No products created yet...</p>
        )}
      </ContentContainer>
    </section>
  );
};

export default ProductListBlock;
