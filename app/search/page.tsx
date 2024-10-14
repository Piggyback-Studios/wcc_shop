"use client";

import { useState, useEffect } from "react";

import SearchBar from "@/src/blocks/SearchBar";
import Spacer from "@/src/blocks/ui/Spacer";
import { Product } from "@/src/shared/types";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");

  const filterProductNames = ({ name }: Product) => {
    return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };

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
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <SearchBar onSearch={setSearchValue} value={searchValue} />
      <Spacer size="lg" />
      <ul>
        {products.filter(filterProductNames).map((product, idx) => (
          <li key={idx}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
