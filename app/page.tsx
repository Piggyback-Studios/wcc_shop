"use client";

import ProductGalleryBlock from "./components/ProductGalleryBlock";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductGalleryBlock />
      <ProductGalleryBlock />
      <ProductGalleryBlock />
      <ProductGalleryBlock />
      <ProductGalleryBlock />
      <ProductGalleryBlock />
      <ProductGalleryBlock />
      <ProductGalleryBlock />
    </main>
  );
}
