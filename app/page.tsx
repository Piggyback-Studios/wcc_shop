"use client";

import ProductGalleryBlock from "@/src/blocks/ProductGalleryBlock";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Home() {
  return (
    <main>
      <Spacer size="lg" />
      <ProductGalleryBlock />
      <Spacer size="lg" />
    </main>
  );
}
