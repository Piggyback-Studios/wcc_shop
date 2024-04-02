"use client";

import ProductGalleryBlock from "./blocks/ProductGalleryBlock";
import ProviderWrapper from "./components/ProviderWrapper";
import Navbar from "./components/Navbar";

import styles from "./page.module.css";

export default function Home() {
  return (
    <ProviderWrapper>
      <Navbar />
      <main className="content_wrapper">
        <ProductGalleryBlock />
      </main>
    </ProviderWrapper>
  );
}
