"use client";

import { useState, useEffect } from "react";

import ContentContainer from "@/src/components/common/ContentContainer";
import CustomInput from "@/src/components/common/CustomInput";
import ProductCard from "@/src/components/ProductCard";

import { SearchBarProps, Product } from "@/src/shared/types";
import { useProductsContext } from "@/src/context/Products";

function SearchBar({ onSearch, value }: SearchBarProps) {
  return (
    <div className="mb-4">
      <h1>Search Our Collection</h1>
      <CustomInput
        name="search"
        placeholder=""
        label="Search"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearch(e.target.value)
        }
        value={value}
      />
    </div>
  );
}

const SearchProducts = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const filterProductNames = ({ name }: Product) => {
    return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };

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
        <SearchBar onSearch={setSearchValue} value={searchValue} />
        <div className="grid gap-4 md:grid-cols-3">
          {productsContext.products.length
            ? productsContext.products
                .filter(filterProductNames)
                .map((product, idx) => <ProductCard {...product} key={idx} />)
            : null}
        </div>
      </ContentContainer>
    </section>
  );
};

export default SearchProducts;
