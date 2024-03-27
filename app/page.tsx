"use client";

import ProductGalleryBlock from "./blocks/ProductGalleryBlock";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content_wrapper}>
        <ProductGalleryBlock />
      </div>
    </main>
  );
}
